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
    const customer = await dbStore.getCustomerById(id);

    if (!customer) {
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 });
    }

    // 1. Update status to APPROVED
    await dbStore.updateCustomerStatus(id, "APPROVED");

    // 2. Send Approved WhatsApp Notification
    const recipient = customer.whatsappNumber || customer.phone;
    const waApproval = await whatsAppService.sendMessage({
      recipient,
      templateType: "APPROVED",
      customerName: customer.fullName,
      registrationId: customer.registrationId,
    });

    await dbStore.logWhatsAppMessage({
      customerId: customer.id,
      messageType: "APPROVED",
      recipient,
      message: waApproval.messageText,
      providerMessageId: waApproval.providerMessageId || null,
      status: waApproval.success ? "SENT" : "FAILED",
    });

    // 3. Dispatch Group Access Instructions
    const waGroup = await whatsAppService.sendMessage({
      recipient,
      templateType: "GROUP_ACCESS",
      customerName: customer.fullName,
      registrationId: customer.registrationId,
    });

    await dbStore.logWhatsAppMessage({
      customerId: customer.id,
      messageType: "GROUP_ACCESS",
      recipient,
      message: waGroup.messageText,
      providerMessageId: waGroup.providerMessageId || null,
      status: waGroup.success ? "SENT" : "FAILED",
    });

    // 4. Update status to GROUP_ACCESS_SENT
    const finalCustomer = await dbStore.updateCustomerStatus(id, "GROUP_ACCESS_SENT");

    return NextResponse.json({
      success: true,
      message: "Customer approved and group access dispatched via WhatsApp.",
      data: finalCustomer,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
