import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { dbStore } from "@/lib/store";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const customers = await dbStore.listCustomers();
    const stats = await dbStore.getAnalyticsStats();

    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").toLowerCase();
    const statusFilter = searchParams.get("status");
    const businessFilter = searchParams.get("businessType");

    let filtered = customers;

    if (query) {
      filtered = filtered.filter(
        (c) =>
          c.fullName.toLowerCase().includes(query) ||
          c.phone.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.registrationId.toLowerCase().includes(query) ||
          (c.businessName && c.businessName.toLowerCase().includes(query)) ||
          c.city.toLowerCase().includes(query)
      );
    }

    if (statusFilter && statusFilter !== "ALL") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (businessFilter && businessFilter !== "ALL") {
      filtered = filtered.filter((c) => c.businessType === businessFilter);
    }

    return NextResponse.json({
      success: true,
      stats,
      data: filtered,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
