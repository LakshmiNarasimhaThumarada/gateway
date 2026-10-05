import { NextRequest, NextResponse } from "next/server";
import { dbStore } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const txnid = searchParams.get("txnid") || "ORD_DEMO_123";
  const regId = searchParams.get("regId") || "REG-DEMO";

  const customer = await dbStore.getCustomerByRegId(regId);
  const customerName = customer?.fullName || "Valued Member";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Easebuzz Payment Gateway (Sandbox Preview)</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
  <div class="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
    
    <div class="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded bg-emerald-600 font-bold flex items-center justify-center text-sm">EB</div>
        <span class="font-bold text-base tracking-wide">Easebuzz Payment Gateway</span>
      </div>
      <span class="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded font-semibold border border-amber-500/30">
        SANDBOX / DEV
      </span>
    </div>

    <div class="p-6">
      <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
        <div class="text-xs text-slate-500 uppercase font-semibold mb-1">Merchant</div>
        <div class="text-sm font-bold text-slate-900">Export-Import Business Community Network</div>
        
        <div class="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-500 block">Registration ID:</span>
            <span className="font-mono font-bold text-slate-800">${regId}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Customer:</span>
            <span className="font-semibold text-slate-800">${customerName}</span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-emerald-800 font-medium block">Total Payable Amount</span>
          <span className="text-2xl font-extrabold text-emerald-900">₹199.00</span>
        </div>
        <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-1 rounded">INR</span>
      </div>

      <p className="text-xs text-slate-500 mb-6 text-center">
        Simulate payment callback status for testing WhatsApp confirmation and admin workflow:
      </p>

      <div className="space-y-3">
        <form action="/api/payment/callback" method="POST">
          <input type="hidden" name="status" value="success" />
          <input type="hidden" name="txnid" value="${txnid}" />
          <input type="hidden" name="amount" value="199.00" />
          <input type="hidden" name="productinfo" value="Export-Import Business Community Access" />
          <input type="hidden" name="firstname" value="${customerName}" />
          <input type="hidden" name="email" value="${customer?.email || 'demo@example.com'}" />
          <input type="hidden" name="udf1" value="${regId}" />
          <input type="hidden" name="easepayid" value="EP_MOCK_${Date.now()}" />
          <input type="hidden" name="isMock" value="true" />
          <input type="hidden" name="hash" value="mock_hash_success" />
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2">
            ✓ Simulate Successful Payment (₹199)
          </button>
        </form>

        <form action="/api/payment/callback" method="POST">
          <input type="hidden" name="status" value="userCancelled" />
          <input type="hidden" name="txnid" value="${txnid}" />
          <input type="hidden" name="amount" value="199.00" />
          <input type="hidden" name="udf1" value="${regId}" />
          <input type="hidden" name="isMock" value="true" />
          <button type="submit" class="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors">
            ✕ Simulate Cancelled / Failed Payment
          </button>
        </form>
      </div>
    </div>

    <div class="bg-slate-50 border-t border-slate-200 p-3 text-center text-[11px] text-slate-400">
      Simulated Easebuzz Gateway Server-Side Callback Verification
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
