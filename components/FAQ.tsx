"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What do I get for ₹199?",
      a: "You receive access to the private export-import business community after successful payment and verification.",
    },
    {
      q: "Is this a WhatsApp group?",
      a: "Yes. Community access is provided through WhatsApp after the registration and verification process.",
    },
    {
      q: "Who can join?",
      a: "Exporters, importers, suppliers, manufacturers, traders, distributors and beginners interested in export-import networking.",
    },
    {
      q: "How will I receive the group access?",
      a: "After successful payment and verification, you will receive the relevant WhatsApp access instructions.",
    },
    {
      q: "Is payment secure?",
      a: "Payments are processed securely through the integrated payment gateway using server-side hash verification.",
    },
    {
      q: "What happens after payment?",
      a: "Your payment is verified, your registration is stored, and a confirmation message is sent. The admin can then verify your registration before community access is provided.",
    },
    {
      q: "Is ₹199 refundable?",
      a: "Please refer to our Refund & Cancellation Policy for full details on eligibility and terms.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Find answers to common questions about joining our export-import network.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-slate-50/50 hover:bg-slate-100/80 transition-colors font-semibold text-slate-900 text-base"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
