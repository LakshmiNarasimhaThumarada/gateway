import React from "react";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Export-Import Business Community",
};

export default function RefundPolicyPage() {
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
            <RefreshCcw className="w-4 h-4" />
            <span>Policy Terms</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Registration Fee Terms</h2>
            <p>
              The ₹199 fee covers community verification, profile administrative setup, and WhatsApp access dispatch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Refund Eligibility</h2>
            <p>
              If your registration is rejected during admin verification due to inability to verify trade credentials, a full refund of ₹199 will be automatically initiated to your original payment source within 5-7 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Refundable Cases</h2>
            <p>
              Once community group access has been approved and delivered, the registration fee is non-refundable. If a member is removed for violating community spam rules, no refund will be issued.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
