import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";
import { easebuzzService } from "@/lib/easebuzz";

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

    // STRICT SECURITY ENFORCEMENT: Price ₹199 set on backend ONLY
    const SERVER_ENFORCED_AMOUNT = 199.0;
    const SERVER_ENFORCED_PAISE = 19900;

    // Generate unique Order ID
    const orderId = `ORD_${registrationId}_${Date.now().toString().slice(-6)}`;

    // Save pending payment record in DB
    await dbStore.createPayment({
      customerId: customer.id,
      orderId,
      amount: SERVER_ENFORCED_PAISE,
      currency: "INR",
      gateway: "EASEBUZZ",
      status: "PENDING",
    });

    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const surl = `${origin}/api/payment/callback`;
    const furl = `${origin}/api/payment/callback`;

    // Initiate payment via Easebuzz gateway service
    const gatewayResult = await easebuzzService.initiatePayment({
      txnid: orderId,
      amount: SERVER_ENFORCED_AMOUNT,
      productinfo: "Export-Import Business Community Access",
      firstname: customer.fullName,
      email: customer.email,
      phone: customer.whatsappNumber || customer.phone,
      surl,
      furl,
      udf1: customer.registrationId,
      udf2: customer.id,
    });

    if (gatewayResult.isMock) {
      return NextResponse.json({
        success: true,
        isMock: true,
        payment_url: gatewayResult.payment_url,
        message: "Development mode: Redirecting to mock Easebuzz payment checkout",
      });
    }

    if (gatewayResult.status === 1 && gatewayResult.data) {
      const checkoutUrl = `${easebuzzService.getBaseUrl()}pay/${gatewayResult.data}`;
      return NextResponse.json({
        success: true,
        payment_url: checkoutUrl,
        access_key: gatewayResult.data,
      });
    }

    return NextResponse.json({
      success: true,
      payment_url: gatewayResult.payment_url || `${origin}/api/payment/mock-checkout?txnid=${orderId}&regId=${customer.registrationId}`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create payment transaction";
    console.error("Payment create error:", error);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
