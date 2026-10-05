"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Clock } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const regId = searchParams.get("regId") || "REG-XXXXXXXX";
  const [customerName, setCustomerName] = useState<string>("Valued Member");

  useEffect(() => {
    if (regId && regId !== "REG-XXXXXXXX") {
      fetch(`/api/payment/status/${regId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data?.fullName) {
            setCustomerName(json.data.fullName);
          }
        })
        .catch(() => {});
    }
  }, [regId]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Top Header Card */}
        <div className="bg-emerald-600 text-white p-8 text-center relative">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Payment Successful!</h1>
          <p className="text-emerald-100 text-sm mt-1">Thank you, {customerName}</p>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-5">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Registration ID</span>
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {regId}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Amount Paid</span>
              <span className="font-bold text-emerald-700 text-sm">₹199.00</span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
              <span className="text-slate-500 font-medium">Payment Status</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Received & Verified
              </span>
            </div>
          </div>

          {/* Next Steps Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 text-sm">What Happens Next?</h3>
                <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                  Your registration is being verified by our admin team. An automated WhatsApp confirmation message has been dispatched to your mobile number.
                </p>
                <p className="text-blue-800 text-xs font-semibold mt-2">
                  You will receive private WhatsApp community group access instructions upon approval.
                </p>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 space-y-2">
            <Link
              href="/"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Contact Support on WhatsApp</span>
            </a>
          </div>

        </div>

        <div className="bg-slate-50 border-t border-slate-100 p-3 text-center text-[11px] text-slate-400">
          Export-Import Business Community • Verification Desk
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
