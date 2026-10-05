"use client";

import React from "react";
import { UserCheck, CreditCard, MessageSquare, Users, ArrowRight, CheckCircle2 } from "lucide-react";

interface HowItWorksProps {
  onOpenRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenRegister }) => {
  const steps = [
    {
      step: "01",
      icon: UserCheck,
      title: "Register Details",
      desc: "Enter your basic business, location, and trade contact information in our quick form.",
    },
    {
      step: "02",
      icon: CreditCard,
      title: "Pay ₹199",
      desc: "Complete your one-time registration fee through our secure integrated payment gateway.",
    },
    {
      step: "03",
      icon: MessageSquare,
      title: "Get Confirmation",
      desc: "Receive instant automated confirmation & registration receipt on WhatsApp.",
    },
    {
      step: "04",
      icon: Users,
      title: "Join Community",
      desc: "After admin verification, receive your private WhatsApp community access instructions.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            4 simple steps to join our verified Export-Import Business Community.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const IconComponent = item.icon || CheckCircle2;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-slate-500 font-mono">{item.step}</span>
                    <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button below process */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Start Registration — ₹199</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
