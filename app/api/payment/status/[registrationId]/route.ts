import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ registrationId: string }> }
) {
  try {
    const { registrationId } = await params;

    if (!registrationId) {
      return NextResponse.json(
        { success: false, message: "Registration ID is required" },
        { status: 400 }
      );
    }

    const customer = await dbStore.getCustomerByRegId(registrationId);
    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        registrationId: customer.registrationId,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
        createdAt: customer.createdAt,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
