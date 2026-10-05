"use client";

import React from "react";
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, Users, CreditCard } from "lucide-react";

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative bg-slate-900 text-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-800">
      {/* Background Subtle Accent Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Limited-time community access offer</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Connect With Exporters, Importers & Buyers
            </h1>

            {/* Alternative Supporting Subtext */}
            <p className="text-emerald-400 font-semibold text-sm sm:text-base mb-4 tracking-wide uppercase">
              Build Real Business Connections in the Export-Import Community
            </p>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-2xl">
              Join a private business networking community where exporters, importers, suppliers, manufacturers and traders can connect, discover opportunities and discuss products.
            </p>

            {/* Pricing Box */}
            <div className="w-full sm:w-auto bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 sm:p-5 mb-8 flex items-center justify-between gap-6 shadow-lg">
              <div>
                <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">One-Time Access Fee</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">₹199</span>
                  <span className="text-lg text-slate-400 line-through font-medium">₹2,499</span>
                  <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    SAVE 92%
                  </span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-400 block font-medium">Instant Access</span>
                <span className="text-xs text-emerald-400 font-semibold">After Verification</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Get Group Access — ₹199</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#what-you-get"
                className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base px-6 py-4 rounded-xl border border-slate-700 transition-colors"
              >
                See What You Get
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs sm:text-sm font-medium pt-2 border-t border-slate-800/80 w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private Community</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Business Network</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure Checkout</span>
              </div>
            </div>

          </div>

          {/* Right Column / Visual Feature Card */}
          <div className="lg:col-span-5 mt-6 lg:mt-0">
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                    EX
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Export-Import Hub</h3>
                    <p className="text-xs text-slate-400">Official WhatsApp Community</p>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
                  Active Trade Desk
                </span>
              </div>

              {/* Sample Activity Feed Mockup */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                    <span className="font-semibold text-slate-300">Spice Exporter (Andhra)</span>
                    <span>10m ago</span>
                  </div>
                  <p className="text-slate-200">"Looking for reliable freight forwarders for 20ft container to Dubai port. CIF rates required."</p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                    <span className="font-semibold text-slate-300">Textile Manufacturer (Surat)</span>
                    <span>25m ago</span>
                  </div>
                  <p className="text-slate-200">"Supplying 100% Cotton Knitted Fabrics. Bulk ready stock for export buyers."</p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                    <span className="font-semibold text-slate-300">Importer (European Market)</span>
                    <span>1h ago</span>
                  </div>
                  <p className="text-slate-200">"Sourcing verified Indian handicraft & ceramic manufacturers for Q4 catalog."</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700 text-center">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Join 1,200+ Verified Trade Professionals →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
