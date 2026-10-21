import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { stringifyUtm } from "@/lib/analytics";
import { createCashfreeOrder } from "@/lib/cashfree";
import { dbStore } from "@/lib/store";

/**
 * Combined Registration + Payment endpoint.
 * Saves customer AND creates Cashfree order in a single request.
 * This avoids the issue of customer data being lost between separate API calls.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod schema
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Invalid registration data";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // ── Step 1: Generate unique Registration ID ─────────────────────────────
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const registrationId = `REG-${dateStr}-${randomDigits}`;

    // Format UTM source string
    const sourceString = stringifyUtm({
      utm_source: data.utmSource,
      utm_medium: data.utmMedium,
      utm_campaign: data.utmCampaign,
      utm_content: data.utmContent,
      utm_term: data.utmTerm,
    });

    // ── Step 2: Create Customer record ──────────────────────────────────────
    const customer = await dbStore.createCustomer({
      registrationId,
      fullName: data.fullName || data.email.split("@")[0] || "Member",
      phone: data.phone,
      whatsappNumber: data.whatsappNumber || data.phone,
      email: data.email,
      businessType: data.businessType || "Exporter",
      businessName: data.businessName || null,
      city: data.city || "India",
      state: data.state || null,
      country: data.country || "India",
      interestedIn: data.interestedIn || "Business Networking",
      source: sourceString,
      status: "PENDING_PAYMENT",
    });

    console.log("[REG+PAY] Customer created:", customer.registrationId, customer.id);

    // ── Step 3: Create Payment (price enforced on backend) ──────────────────
    const SERVER_ENFORCED_AMOUNT = 199.0; // ₹199 INR
    const orderId = `ORD_${registrationId}_${Date.now().toString().slice(-8)}`;

    await dbStore.createPayment({
      customerId: customer.id,
      orderId,
      amount: 19900, // stored in paise
      currency: "INR",
      gateway: "CASHFREE",
      status: "PENDING",
    });

    console.log("[REG+PAY] Payment record created:", orderId);

    // ── Step 4: Create Cashfree Order ───────────────────────────────────────
    // Cashfree PRODUCTION requires HTTPS return_url.
    // We use modal checkout on frontend, so this URL is only hit if user
    // manually navigates back. Force HTTPS for the API call.
    let origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    origin = origin.replace(/^http:\/\/localhost/, "https://localhost");
    const returnUrl = `${origin}/payment/success`;

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
      console.error("[REG+PAY] Cashfree order creation failed:", result.error);
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Payment initiation failed. Please try again.",
        },
        { status: 502 }
      );
    }

    console.log("[REG+PAY] Cashfree order created:", result.orderId);

    // ── Return payment_session_id to frontend ───────────────────────────────
    return NextResponse.json({
      success: true,
      payment_session_id: result.paymentSessionId,
      order_id: result.orderId,
      registration_id: customer.registrationId,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Registration & payment failed";
    console.error("[REG+PAY] Error:", error);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
