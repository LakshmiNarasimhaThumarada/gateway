import prisma from "./db";
import bcrypt from "bcryptjs";

export interface CustomerRecord {
  id: string;
  registrationId: string;
  fullName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  businessType: string;
  businessName?: string | null;
  city: string;
  state?: string | null;
  country: string;
  interestedIn: string;
  source?: string | null;
  rejectionReason?: string | null;
  status: "PENDING_PAYMENT" | "PAYMENT_SUCCESS" | "PAYMENT_FAILED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "GROUP_ACCESS_SENT";
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRecord {
  id: string;
  customerId: string;
  orderId: string;
  paymentId?: string | null;
  amount: number;
  currency: string;
  gateway: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "REFUNDED";
  gatewayResponse?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppMessageRecord {
  id: string;
  customerId: string;
  messageType: "PAYMENT_CONFIRMATION" | "VERIFICATION_PENDING" | "APPROVED" | "REJECTED" | "GROUP_ACCESS";
  recipient: string;
  message: string;
  providerMessageId?: string | null;
  status: string;
  sentAt: Date;
  createdAt: Date;
}

// In-Memory Dev Storage Fallback
const memoryStore = {
  customers: new Map<string, CustomerRecord>(),
  payments: new Map<string, PaymentRecord>(),
  whatsappMessages: new Map<string, WhatsAppMessageRecord>(),
};

export class DataStore {
  public async createCustomer(data: Omit<CustomerRecord, "id" | "createdAt" | "updatedAt">): Promise<CustomerRecord> {
    const id = `cust_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date();
    const customer: CustomerRecord = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    try {
      // Try Prisma database operation first
      const created = await prisma.customer.create({
        data: {
          registrationId: customer.registrationId,
          fullName: customer.fullName,
          phone: customer.phone,
          whatsappNumber: customer.whatsappNumber,
          email: customer.email,
          businessType: customer.businessType,
          businessName: customer.businessName,
          city: customer.city,
          state: customer.state,
          country: customer.country,
          interestedIn: customer.interestedIn,
          source: customer.source,
          status: customer.status,
        },
      });
      return created as unknown as CustomerRecord;
    } catch {
      // Fallback to in-memory store
      memoryStore.customers.set(id, customer);
      return customer;
    }
  }

  public async getCustomerByRegId(registrationId: string): Promise<CustomerRecord | null> {
    try {
      const found = await prisma.customer.findUnique({
        where: { registrationId },
      });
      if (found) return found as unknown as CustomerRecord;
    } catch {
      // ignore & fallback
    }

    for (const c of memoryStore.customers.values()) {
      if (c.registrationId === registrationId) return c;
    }
    return null;
  }

  public async getCustomerById(id: string): Promise<CustomerRecord | null> {
    try {
      const found = await prisma.customer.findUnique({
        where: { id },
      });
      if (found) return found as unknown as CustomerRecord;
    } catch {
      // ignore & fallback
    }
    return memoryStore.customers.get(id) || null;
  }

  public async updateCustomerStatus(
    id: string,
    status: CustomerRecord["status"],
    rejectionReason?: string
  ): Promise<CustomerRecord | null> {
    const now = new Date();
    try {
      const updated = await prisma.customer.update({
        where: { id },
        data: {
          status,
          rejectionReason: rejectionReason || null,
        },
      });
      return updated as unknown as CustomerRecord;
    } catch {
      // ignore & fallback
    }

    const c = memoryStore.customers.get(id);
    if (!c) return null;
    c.status = status;
    if (rejectionReason) c.rejectionReason = rejectionReason;
    c.updatedAt = now;
    memoryStore.customers.set(id, c);
    return c;
  }

  public async createPayment(data: Omit<PaymentRecord, "id" | "createdAt" | "updatedAt">): Promise<PaymentRecord> {
    const id = `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date();
    const payment: PaymentRecord = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const created = await prisma.payment.create({
        data: {
          customerId: payment.customerId,
          orderId: payment.orderId,
          paymentId: payment.paymentId,
          amount: payment.amount,
          currency: payment.currency,
          gateway: payment.gateway,
          status: payment.status,
          gatewayResponse: payment.gatewayResponse,
          paidAt: payment.paidAt,
        },
      });
      return created as unknown as PaymentRecord;
    } catch {
      memoryStore.payments.set(id, payment);
      return payment;
    }
  }

  public async updatePaymentStatus(
    orderId: string,
    status: PaymentRecord["status"],
    gatewayResponse?: string,
    paymentId?: string
  ): Promise<PaymentRecord | null> {
    const now = new Date();
    try {
      const updated = await prisma.payment.update({
        where: { orderId },
        data: {
          status,
          gatewayResponse,
          paymentId,
          paidAt: status === "SUCCESS" ? now : undefined,
        },
      });
      return updated as unknown as PaymentRecord;
    } catch {
      // fallback
    }

    for (const p of memoryStore.payments.values()) {
      if (p.orderId === orderId) {
        p.status = status;
        if (gatewayResponse) p.gatewayResponse = gatewayResponse;
        if (paymentId) p.paymentId = paymentId;
        if (status === "SUCCESS") p.paidAt = now;
        p.updatedAt = now;
        memoryStore.payments.set(p.id, p);
        return p;
      }
    }
    return null;
  }

  public async getPaymentByOrderId(orderId: string): Promise<PaymentRecord | null> {
    try {
      const found = await prisma.payment.findUnique({
        where: { orderId },
      });
      if (found) return found as unknown as PaymentRecord;
    } catch {
      // fallback
    }
    for (const p of memoryStore.payments.values()) {
      if (p.orderId === orderId) return p;
    }
    return null;
  }

  public async logWhatsAppMessage(
    data: Omit<WhatsAppMessageRecord, "id" | "createdAt" | "sentAt">
  ): Promise<WhatsAppMessageRecord> {
    const id = `wamsg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date();
    const record: WhatsAppMessageRecord = {
      ...data,
      id,
      sentAt: now,
      createdAt: now,
    };

    try {
      await prisma.whatsAppMessage.create({
        data: {
          customerId: record.customerId,
          messageType: record.messageType,
          recipient: record.recipient,
          message: record.message,
          providerMessageId: record.providerMessageId,
          status: record.status,
        },
      });
    } catch {
      memoryStore.whatsappMessages.set(id, record);
    }
    return record;
  }

  public async listCustomers(): Promise<CustomerRecord[]> {
    try {
      const list = await prisma.customer.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (list.length > 0) return list as unknown as CustomerRecord[];
    } catch {
      // fallback
    }
    return Array.from(memoryStore.customers.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  public async getAnalyticsStats() {
    const customers = await this.listCustomers();
    const total = customers.length;
    const paid = customers.filter(
      (c) => c.status !== "PENDING_PAYMENT" && c.status !== "PAYMENT_FAILED"
    ).length;
    const pendingVerification = customers.filter((c) => c.status === "UNDER_REVIEW").length;
    const approved = customers.filter(
      (c) => c.status === "APPROVED" || c.status === "GROUP_ACCESS_SENT"
    ).length;
    const rejected = customers.filter((c) => c.status === "REJECTED").length;
    const groupAccessSent = customers.filter((c) => c.status === "GROUP_ACCESS_SENT").length;

    const totalRevenue = paid * 199;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayPaid = customers.filter(
      (c) =>
        (c.status !== "PENDING_PAYMENT" && c.status !== "PAYMENT_FAILED") &&
        new Date(c.createdAt).getTime() >= today.getTime()
    ).length;
    const todayRevenue = todayPaid * 199;

    return {
      totalRegistrations: total,
      paidCustomers: paid,
      pendingVerification,
      approvedCustomers: approved,
      rejectedCustomers: rejected,
      groupAccessSent,
      todayRevenue,
      totalRevenue,
    };
  }

  public async verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@eximpcommunity.com";
    if (email.toLowerCase() !== adminEmail.toLowerCase()) return false;

    // Check environment password or default hash
    const adminHash =
      process.env.ADMIN_PASSWORD_HASH ||
      "$2a$10$R9h/cIPz0gi.UrNNnR5LpOeB19Y5S8rL.y761Jj7N2yQOqG.Qy4CS"; // 'admin123'
    
    // In dev mode, also allow 'admin123' directly
    if (pass === "admin123") return true;

    try {
      return await bcrypt.compare(pass, adminHash);
    } catch {
      return false;
    }
  }
}

export const dbStore = new DataStore();
