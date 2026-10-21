import { Cashfree, CFEnvironment } from "cashfree-pg";

// ─── Cashfree Client (singleton) ────────────────────────────────────────────
const env =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

const cashfree = new Cashfree(
  env,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CreateOrderParams {
  orderId: string;
  amount: number; // in INR (e.g. 199)
  customerEmail: string;
  customerPhone: string;
  customerId: string;
  returnUrl: string;
  orderNote?: string;
}

export interface CashfreeOrderResult {
  success: boolean;
  paymentSessionId?: string;
  orderId?: string;
  cfOrderId?: string;
  paymentUrl?: string;
  error?: string;
}

// ─── Create Order ─────────────────────────────────────────────────────────────
export async function createCashfreeOrder(
  params: CreateOrderParams
): Promise<CashfreeOrderResult> {
  const {
    orderId,
    amount,
    customerEmail,
    customerPhone,
    customerId,
    returnUrl,
    orderNote,
  } = params;

  const request = {
    order_id: orderId,
    order_amount: amount.toFixed(2),
    order_currency: "INR",
    customer_details: {
      customer_id: customerId,
      customer_name: "", // not collecting name
      customer_email: customerEmail,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: `${returnUrl}?order_id={order_id}`,
    },
    order_note: orderNote || "Export-Import Business Community Access",
  };

  try {
    const response = await cashfree.PGCreateOrder(request);
    const data = response.data;

    return {
      success: true,
      paymentSessionId: data.payment_session_id,
      orderId: data.order_id,
      cfOrderId: data.cf_order_id?.toString(),
    };
  } catch (err: unknown) {
    const errObj = err as { response?: { status?: number; data?: { message?: string; code?: string } } };
    const status = errObj?.response?.status;
    const errorData = errObj?.response?.data;
    const message = errorData?.message || (err instanceof Error ? err.message : "Cashfree order creation failed");

    console.error("Cashfree createOrder error | status:", status, "| data:", errorData);

    // Specific auth error
    if (status === 401 || status === 403 || errorData?.code === "authentication_failed") {
      return {
        success: false,
        error: "CASHFREE_AUTH_ERROR: Invalid App ID or Secret Key. Please check your .env.local file.",
      };
    }

    return { success: false, error: message };
  }
}

// ─── Verify / Fetch Order Status ─────────────────────────────────────────────
export async function getCashfreeOrderStatus(orderId: string): Promise<{
  success: boolean;
  status?: string;
  cfPaymentId?: string;
  rawData?: unknown;
  error?: string;
}> {
  try {
    const response = await cashfree.PGFetchOrder(orderId);
    const data = response.data;

    return {
      success: true,
      status: data.order_status, // ACTIVE | PAID | EXPIRED | CANCELLED
      cfPaymentId: data.cf_order_id?.toString(),
      rawData: data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch order status";
    console.error("Cashfree fetchOrder error:", err);
    return { success: false, error: message };
  }
}

export { cashfree };
