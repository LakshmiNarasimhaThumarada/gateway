import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { dbStore } from "@/lib/store";
import { whatsAppService } from "@/lib/whatsapp";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const rejectionReason = body.rejectionReason || "Details could not be verified by trade desk";

    const customer = await dbStore.getCustomerById(id);
    if (!customer) {
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 });
    }

    // Update DB status
    const updated = await dbStore.updateCustomerStatus(id, "REJECTED", rejectionReason);

    // Send WhatsApp Rejection notification
    const recipient = customer.whatsappNumber || customer.phone;
    const waRejection = await whatsAppService.sendMessage({
      recipient,
      templateType: "REJECTED",
      customerName: customer.fullName,
      registrationId: customer.registrationId,
      rejectionReason,
    });

    await dbStore.logWhatsAppMessage({
      customerId: customer.id,
      messageType: "REJECTED",
      recipient,
      message: waRejection.messageText,
      providerMessageId: waRejection.providerMessageId || null,
      status: waRejection.success ? "SENT" : "FAILED",
    });

    return NextResponse.json({
      success: true,
      message: "Customer status updated to REJECTED and WhatsApp notification sent.",
      data: updated,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
