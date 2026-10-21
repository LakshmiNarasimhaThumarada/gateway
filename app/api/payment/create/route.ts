import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { createCashfreeOrder } from "@/lib/cashfree";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, message: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Lookup customer
    const customer = await dbStore.getCustomerByRegId(registrationId);
    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer registration not found" },
        { status: 404 }
      );
    }

    // ── PRICE ENFORCED ON BACKEND ONLY ─────────────────────────────────────
    const SERVER_ENFORCED_AMOUNT = 199.0; // ₹199 INR

    // Generate unique Order ID for Cashfree
    const orderId = `ORD_${registrationId}_${Date.now().toString().slice(-8)}`;

    // Save pending payment record in DB
    await dbStore.createPayment({
      customerId: customer.id,
      orderId,
      amount: 19900, // stored in paise
      currency: "INR",
      gateway: "CASHFREE",
      status: "PENDING",
    });

    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = `${origin}/payment/success`;

    // ── Create Cashfree Order ───────────────────────────────────────────────
    const result = await createCashfreeOrder({
      orderId,
      amount: SERVER_ENFORCED_AMOUNT,
      customerEmail: customer.email,
      customerPhone: customer.whatsappNumber || customer.phone,
      customerId: customer.registrationId,
      returnUrl,
      orderNote: "Export-Import Business Community Access ₹199",
    });

    if (!result.success || !result.paymentSessionId) {
      console.error("Cashfree order creation failed:", result.error);
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Payment initiation failed. Please try again.",
        },
        { status: 502 }
      );
    }

    // Return payment_session_id → used by Cashfree JS SDK on frontend to open checkout
    return NextResponse.json({
      success: true,
      payment_session_id: result.paymentSessionId,
      order_id: result.orderId,
      registration_id: customer.registrationId,
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to create payment transaction";
    console.error("Payment create error:", error);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
