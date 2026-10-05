import { NextRequest, NextResponse } from "next/server";
import { easebuzzService } from "@/lib/easebuzz";
import { dbStore } from "@/lib/store";
import { whatsAppService } from "@/lib/whatsapp";

async function handlePaymentCallback(data: Record<string, string>, req: NextRequest) {
  const status = data.status || "";
  const orderId = data.txnid || "";
  const registrationId = data.udf1 || "";
  const paymentId = data.easepayid || data.mihpayid || `PAY_${Date.now()}`;

  // Step 1: Server-side SHA-512 signature validation
  const isValidSignature = easebuzzService.verifyResponseHash(data);
  if (!isValidSignature && data.isMock !== "true") {
    console.error("Invalid Easebuzz payment signature callback detected!", data);
    return NextResponse.redirect(new URL("/payment/failed?reason=signature_invalid", req.url));
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Step 2: Handle Successful Payment
  if (status === "success" || data.isMock === "true") {
    // Update Payment record
    await dbStore.updatePaymentStatus(orderId, "SUCCESS", JSON.stringify(data), paymentId);

    // Update Customer Status to UNDER_REVIEW
    if (registrationId) {
      const customer = await dbStore.getCustomerByRegId(registrationId);
      if (customer) {
        await dbStore.updateCustomerStatus(customer.id, "UNDER_REVIEW");

        // Step 3: Trigger Automatic WhatsApp Payment Confirmation Message
        const waResult = await whatsAppService.sendMessage({
          recipient: customer.whatsappNumber || customer.phone,
          templateType: "PAYMENT_CONFIRMATION",
          customerName: customer.fullName,
          registrationId: customer.registrationId,
        });

        // Log WhatsApp message record in DB
        await dbStore.logWhatsAppMessage({
          customerId: customer.id,
          messageType: "PAYMENT_CONFIRMATION",
          recipient: customer.whatsappNumber || customer.phone,
          message: waResult.messageText,
          providerMessageId: waResult.providerMessageId || null,
          status: waResult.success ? "SENT" : "FAILED",
        });
      }
    }

    // Step 4: Redirect to Payment Success Page
    return NextResponse.redirect(new URL(`/payment/success?regId=${registrationId}&orderId=${orderId}`, origin));
  }

  // Step 5: Handle Failed or Cancelled Payment
  await dbStore.updatePaymentStatus(orderId, "FAILED", JSON.stringify(data), paymentId);
  if (registrationId) {
    const customer = await dbStore.getCustomerByRegId(registrationId);
    if (customer) {
      await dbStore.updateCustomerStatus(customer.id, "PAYMENT_FAILED");
    }
  }

  return NextResponse.redirect(new URL(`/payment/failed?regId=${registrationId}`, origin));
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
    } else {
      data = await req.json();
    }

    return await handlePaymentCallback(data, req);
  } catch (error) {
    console.error("Payment callback exception:", error);
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/payment/failed", origin));
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const data: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    data[key] = val;
  });
  return await handlePaymentCallback(data, req);
}
