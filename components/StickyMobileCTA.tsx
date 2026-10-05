"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface StickyMobileCTAProps {
  onOpenRegister: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenRegister }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-slate-900 border-t border-slate-800 p-3 shadow-2xl backdrop-blur bg-slate-900/95">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Access Price</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-white">₹199</span>
            <span className="text-xs text-slate-400 line-through">₹2,499</span>
          </div>
        </div>

        <button
          onClick={onOpenRegister}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <span>Get Group Access</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
