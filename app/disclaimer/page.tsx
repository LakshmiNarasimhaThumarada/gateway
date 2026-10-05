import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Disclaimer | Export-Import Business Community",
};

export default function DisclaimerPage() {
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
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Important Notice</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Earnings & Business Disclaimer</h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. No Income or Profit Guarantees</h2>
            <p>
              We explicitly make no claims or guarantees regarding business revenue, buyer commitments, export contracts, or guaranteed income. Joining the community provides networking channels and B2B communication access only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Member Due Diligence</h2>
            <p>
              Members are solely responsible for conducting background checks, credit checks, sample evaluations, and contract verifications before engaging in financial transactions with other community members.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
