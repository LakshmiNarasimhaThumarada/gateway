import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Export-Import Business Community",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center font-bold">
              EX
            </div>
            <span>Export-Import Community</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-emerald-700 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6 text-sm leading-relaxed text-slate-700">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Community Access</h2>
            <p>
              Access to the Export-Import Business Community is granted upon payment of the ₹199 registration fee and subsequent admin review. Community members agree to maintain professional B2B decorum at all times.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Member Responsibilities</h2>
            <p>
              Spam, misleading trade claims, unauthorized marketing of prohibited items, or abusive behavior will result in immediate removal without refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Independent Business Deals</h2>
            <p>
              Our platform acts solely as a communication and networking directory. Members conduct business transactions independently. We do not participate in or guarantee deal fulfillment.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
