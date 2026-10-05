import crypto from "crypto";

export interface EasebuzzInitiateParams {
  txnid: string;
  amount: number; // e.g. 199
  productinfo: string; // e.g. "Export-Import Business Community Access"
  firstname: string;
  email: string;
  phone: string;
  surl: string; // success callback URL
  furl: string; // failure callback URL
  udf1?: string; // registrationId
  udf2?: string;
  udf3?: string;
}

export interface EasebuzzVerifyParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
  hash: string;
}

export class EasebuzzPaymentService {
  private key: string;
  private salt: string;
  private env: string;

  constructor() {
    this.key = process.env.EASEBUZZ_KEY || "EASEBUZZ_KEY_TEST";
    this.salt = process.env.EASEBUZZ_SALT || "EASEBUZZ_SALT_TEST";
    this.env = process.env.EASEBUZZ_ENV || "test";
  }

  public getBaseUrl(): string {
    return this.env === "prod"
      ? "https://pay.easebuzz.in/"
      : "https://testpay.easebuzz.in/";
  }

  /**
   * Generates SHA-512 hash for Easebuzz Initiate Payment Request:
   * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt)
   */
  public generateInitiateHash(params: EasebuzzInitiateParams): string {
    const formattedAmount = params.amount.toFixed(2);
    const hashString = `${this.key}|${params.txnid}|${formattedAmount}|${params.productinfo}|${params.firstname}|${params.email}|${params.udf1 || ""}|${params.udf2 || ""}|${params.udf3 || ""}||||||||${this.salt}`;
    return crypto.createHash("sha512").update(hashString).digest("hex");
  }

  /**
   * Verifies SHA-512 hash from Easebuzz Callback / Webhook:
   * sha512(salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
   */
  public verifyResponseHash(data: Record<string, string>): boolean {
    if (!data || !data.hash) return false;

    // If running in development without real credentials, accept mock success
    if (this.key.includes("TEST") && data.isMock === "true") {
      return true;
    }

    const {
      status = "",
      udf10 = "",
      udf9 = "",
      udf8 = "",
      udf7 = "",
      udf6 = "",
      udf5 = "",
      udf4 = "",
      udf3 = "",
      udf2 = "",
      udf1 = "",
      email = "",
      firstname = "",
      productinfo = "",
      amount = "",
      txnid = "",
      hash = "",
    } = data;

    const hashSequence = `${this.salt}|${status}|${udf10}|${udf9}|${udf8}|${udf7}|${udf6}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${this.key}`;
    const calculatedHash = crypto
      .createHash("sha512")
      .update(hashSequence)
      .digest("hex");

    return calculatedHash.toLowerCase() === hash.toLowerCase();
  }

  /**
   * Initiates payment order with Easebuzz API or returns redirect data
   */
  public async initiatePayment(params: EasebuzzInitiateParams) {
    // ALWAYS enforce backend price ₹199 (199.00)
    const FIXED_AMOUNT = 199.0;
    const formattedAmount = FIXED_AMOUNT.toFixed(2);

    const hash = this.generateInitiateHash({
      ...params,
      amount: FIXED_AMOUNT,
    });

    const formData = new URLSearchParams();
    formData.append("key", this.key);
    formData.append("txnid", params.txnid);
    formData.append("amount", formattedAmount);
    formData.append("productinfo", params.productinfo);
    formData.append("firstname", params.firstname);
    formData.append("phone", params.phone);
    formData.append("email", params.email);
    formData.append("surl", params.surl);
    formData.append("furl", params.furl);
    formData.append("hash", hash);
    formData.append("udf1", params.udf1 || "");
    formData.append("udf2", params.udf2 || "");
    formData.append("udf3", params.udf3 || "");

    const endpoint = `${this.getBaseUrl()}payment/initiate.php`;

    // If dummy test mode or no live credentials configured, return mock gateway session
    if (this.key === "YOUR_EASEBUZZ_KEY" || this.key.includes("TEST")) {
      return {
        success: true,
        isMock: true,
        access_key: `mock_access_key_${params.txnid}`,
        payment_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/mock-checkout?txnid=${params.txnid}&regId=${params.udf1}`,
        message: "Development mode: Mock Easebuzz Payment Initialized",
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formData.toString(),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Easebuzz payment initiation error:", error);
      throw new Error("Payment gateway connection failed.");
    }
  }
}

export const easebuzzService = new EasebuzzPaymentService();
