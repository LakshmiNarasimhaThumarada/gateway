export type WhatsAppTemplateType =
  | "PAYMENT_CONFIRMATION"
  | "VERIFICATION_PENDING"
  | "APPROVED"
  | "REJECTED"
  | "GROUP_ACCESS";

export interface SendWhatsAppParams {
  recipient: string; // e.g. "+919876543210"
  templateType: WhatsAppTemplateType;
  customerName: string;
  registrationId: string;
  rejectionReason?: string;
  groupAccessLink?: string;
}

export class WhatsAppService {
  private accessToken: string;
  private phoneNumberId: string;
  private communityLink: string;

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || "";
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    this.communityLink =
      process.env.WHATSAPP_COMMUNITY_LINK ||
      "https://chat.whatsapp.com/ExImpCommunityPrivateGroup";
  }

  /**
   * Formats message text according to template type
   */
  public generateMessageContent(params: SendWhatsAppParams): string {
    const { templateType, customerName, registrationId, rejectionReason, groupAccessLink } = params;
    const link = groupAccessLink || this.communityLink;

    switch (templateType) {
      case "PAYMENT_CONFIRMATION":
        return `Hi ${customerName},

Your ₹199 payment for the Export-Import Business Community access has been successfully received.

Registration ID: ${registrationId}

Your registration is now under review by our admin team. You will receive group access instructions once verified.

Thank you!`;

      case "VERIFICATION_PENDING":
        return `Hi ${customerName},

Your Export-Import Business Community registration (${registrationId}) is currently being processed by our verification team.

We verify all registrations to ensure a high-quality, authentic business networking group. We will update you shortly!`;

      case "APPROVED":
        return `Hi ${customerName},

Great news! Your registration (${registrationId}) for the Export-Import Business Community has been APPROVED! 🎉

Welcome to the network of exporters, importers, manufacturers & traders.`;

      case "GROUP_ACCESS":
        return `Hi ${customerName},

Here is your exclusive private WhatsApp Group access link for the Export-Import Business Community:

👉 ${link}

Registration ID: ${registrationId}

Rules of the Community:
1. Maintain professional business decorum.
2. Share genuine trade enquiries, product requirements, and export-import opportunities.
3. Respect all community members.

Click the link above to join now!`;

      case "REJECTED":
        return `Hi ${customerName},

Regarding your Export-Import Business Community registration (${registrationId}):

Unfortunately, your registration could not be verified at this time.
Reason: ${rejectionReason || "Incomplete business details provided."}

If you believe this was an error, please contact support.`;

      default:
        return `Hello ${customerName}, update regarding your registration ${registrationId}.`;
    }
  }

  /**
   * Dispatches WhatsApp message via Meta Cloud API or logs in local dev mode
   */
  public async sendMessage(params: SendWhatsAppParams): Promise<{
    success: boolean;
    providerMessageId?: string;
    messageText: string;
    error?: string;
  }> {
    const messageText = this.generateMessageContent(params);
    let recipientPhone = params.recipient.replace(/\D/g, "");
    if (!recipientPhone.startsWith("91") && recipientPhone.length === 10) {
      recipientPhone = `91${recipientPhone}`;
    }

    // Fallback if credentials are not configured in environment
    if (!this.accessToken || !this.phoneNumberId || this.accessToken.includes("YOUR")) {
      console.log(`[WHATSAPP MOCK LOG] Sent to ${recipientPhone}:`);
      console.log(messageText);
      return {
        success: true,
        providerMessageId: `mock_wa_msg_${Date.now()}_${params.registrationId}`,
        messageText,
      };
    }

    try {
      const endpoint = `https://graph.facebook.com/v21.0/${this.phoneNumberId}/messages`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipientPhone,
          type: "text",
          text: {
            preview_url: true,
            body: messageText,
          },
        }),
      });

      const data = await response.json();
      if (response.ok && data.messages?.[0]?.id) {
        return {
          success: true,
          providerMessageId: data.messages[0].id,
          messageText,
        };
      } else {
        console.error("WhatsApp Cloud API error response:", data);
        return {
          success: false,
          error: data.error?.message || "WhatsApp Cloud API request failed",
          messageText,
        };
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "WhatsApp dispatch error";
      console.error("WhatsApp service exception:", errorMsg);
      return {
        success: false,
        error: errorMsg,
        messageText,
      };
    }
  }
}

export const whatsAppService = new WhatsAppService();
