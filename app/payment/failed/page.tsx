"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, RefreshCw, MessageSquare, AlertCircle } from "lucide-react";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const regId = searchParams.get("regId");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-red-600 text-white p-8 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white text-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Payment Could Not Be Completed</h1>
          <p className="text-red-100 text-sm mt-1">Transaction was declined or cancelled</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800 leading-relaxed">
              Don't worry! Your registration record is saved. You can safely retry your payment without filling out the registration form again.
              {regId && <span className="block font-mono font-bold mt-1 text-slate-900">Registration ID: {regId}</span>}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Payment Again (₹199)</span>
            </Link>

            <a
              href="https://wa.me/919876543210?text=Hi,%20I%20had%20an%20issue%20completing%20my%20payment%20for%20Export%20Import%20Community"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-300"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Contact Support on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 p-3 text-center text-[11px] text-slate-400">
          Export-Import Business Community • Customer Care
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
