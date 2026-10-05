"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface FinalCTAProps {
  onOpenRegister: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 border border-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Limited-Time Access Offer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Ready to Expand Your Export-Import Network?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Join the community and start connecting with businesses, suppliers, exporters and importers.
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl mb-8">
          <div className="text-left">
            <span className="text-xs text-slate-400 block font-medium">One-Time Registration Fee</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">₹199</span>
              <span className="text-lg text-slate-400 line-through">₹2,499</span>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Get Group Access — ₹199</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          ✓ Verified Payment Gateway • Instant Automated Receipt • Safe & Secure
        </p>

      </div>
    </section>
  );
};
