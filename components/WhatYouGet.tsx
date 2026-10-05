"use client";

import React from "react";
import { MessageSquare, Users, TrendingUp, Package, Link2, Ship } from "lucide-react";

export const WhatYouGet: React.FC = () => {
  const items = [
    {
      icon: MessageSquare,
      title: "Private WhatsApp Group Access",
      desc: "Join a focused community for export-import networking, trade discussions, and verified contact exchange.",
    },
    {
      icon: Users,
      title: "Connect with Exporters & Importers",
      desc: "Direct access to active trade professionals, buyers, suppliers, and distributors across various sectors.",
    },
    {
      icon: TrendingUp,
      title: "Business & Trade Opportunities",
      desc: "Discover genuine business leads, global trade requirements, and commercial procurement enquiries.",
    },
    {
      icon: Package,
      title: "Product Requirements & Discussions",
      desc: "Share your product specifications, request sample catalogs, and discuss manufacturing capacity.",
    },
    {
      icon: Link2,
      title: "Supplier & Buyer Networking",
      desc: "Build strategic partnerships with verified manufacturers, freight forwarders, and raw material suppliers.",
    },
    {
      icon: Ship,
      title: "Export-Import Business Community",
      desc: "Collaborate on international shipping, logistics solutions, customs clarity, and export market insights.",
    },
  ];

  return (
    <section id="what-you-get" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
            Member Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            What You Get
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to expand your business network and discover active trade opportunities.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold mb-5 border border-emerald-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
