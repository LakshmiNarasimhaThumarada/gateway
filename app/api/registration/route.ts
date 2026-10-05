import { NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { dbStore } from "@/lib/store";
import { stringifyUtm } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod schema
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Invalid registration data";
      return NextResponse.json(
        { success: false, message: firstError, errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate unique Registration ID: REG-YYYYMMDD-XXXXXX
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

    // Create Customer record in database
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

    return NextResponse.json({
      success: true,
      message: "Registration created successfully. Proceeding to payment.",
      data: {
        customerId: customer.id,
        registrationId: customer.registrationId,
        amount: 199, // ₹199
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
