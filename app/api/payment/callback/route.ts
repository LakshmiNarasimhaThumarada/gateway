import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { whatsAppService } from "@/lib/whatsapp";
import { getCashfreeOrderStatus } from "@/lib/cashfree";

// ─────────────────────────────────────────────────────────────────────────────
// Cashfree calls this webhook URL after payment is completed.
// Also handles the return_url GET redirect after customer finishes payment.
// ─────────────────────────────────────────────────────────────────────────────

async function handleSuccess(orderId: string, req: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Verify the order status with Cashfree server-side (never trust client data)
  const statusResult = await getCashfreeOrderStatus(orderId);

  if (!statusResult.success || statusResult.status !== "PAID") {
    console.warn("Cashfree order not PAID:", orderId, statusResult);
    await dbStore.updatePaymentStatus(orderId, "FAILED", JSON.stringify(statusResult), "");
    return NextResponse.redirect(new URL(`/payment/failed?orderId=${orderId}`, origin));
  }

  // Update payment record to SUCCESS
  await dbStore.updatePaymentStatus(
    orderId,
    "SUCCESS",
    JSON.stringify(statusResult.rawData),
    statusResult.cfPaymentId || ""
  );

  // Find customer by orderId (extract registrationId from orderId format: ORD_{regId}_{ts})
  const parts = orderId.split("_");
  const registrationId = parts.length >= 2 ? parts[1] : "";

  if (registrationId) {
    const customer = await dbStore.getCustomerByRegId(registrationId);
    if (customer) {
      // Move customer status → UNDER_REVIEW (waiting for admin approval)
      await dbStore.updateCustomerStatus(customer.id, "UNDER_REVIEW");

      // Trigger WhatsApp confirmation message
      try {
        const waResult = await whatsAppService.sendMessage({
          recipient: customer.whatsappNumber || customer.phone,
          templateType: "PAYMENT_CONFIRMATION",
          customerName: customer.fullName || "Member",
          registrationId: customer.registrationId,
        });

        await dbStore.logWhatsAppMessage({
          customerId: customer.id,
          messageType: "PAYMENT_CONFIRMATION",
          recipient: customer.whatsappNumber || customer.phone,
          message: waResult.messageText,
          providerMessageId: waResult.providerMessageId || null,
          status: waResult.success ? "SENT" : "FAILED",
        });
      } catch (waErr) {
        console.error("WhatsApp notification failed (non-critical):", waErr);
      }
    }
  }

  return NextResponse.redirect(
    new URL(`/payment/success?orderId=${orderId}&regId=${registrationId}`, origin)
  );
}

// ─── GET: Cashfree return_url redirect after customer pays ───────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id") || "";

  if (!orderId) {
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/payment/failed?reason=missing_order", origin));
  }

  return handleSuccess(orderId, req);
}

// ─── POST: Cashfree server-to-server webhook ─────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId: string = body?.data?.order?.order_id || body?.order_id || "";

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing order_id" }, { status: 400 });
    }

    // Only act on PAYMENT_SUCCESS events
    const eventType: string = body?.type || "";
    if (eventType && eventType !== "PAYMENT_SUCCESS_WEBHOOK") {
      // Acknowledge other events without processing
      return NextResponse.json({ success: true, message: "Event acknowledged" });
    }

    await handleSuccess(orderId, req);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cashfree webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
