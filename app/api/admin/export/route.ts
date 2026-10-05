import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { dbStore } from "@/lib/store";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const customers = await dbStore.listCustomers();

    // Generate CSV string
    const headers = [
      "Registration ID",
      "Full Name",
      "Phone",
      "WhatsApp Number",
      "Email",
      "Business Type",
      "Business Name",
      "City",
      "State",
      "Interested In",
      "Status",
      "UTM Source",
      "Created Date",
    ];

    const rows = customers.map((c) => [
      `"${c.registrationId}"`,
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.whatsappNumber}"`,
      `"${c.email}"`,
      `"${c.businessType}"`,
      `"${(c.businessName || "").replace(/"/g, '""')}"`,
      `"${c.city}"`,
      `"${c.state || ""}"`,
      `"${c.interestedIn}"`,
      `"${c.status}"`,
      `"${c.source || ""}"`,
      `"${new Date(c.createdAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=exim_community_customers_${new Date().toISOString().slice(0, 10)}.csv`,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
