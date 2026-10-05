"use client";

import React from "react";
import { Target, Truck, Factory, Search, Globe, Sprout } from "lucide-react";

export const WhoShouldJoin: React.FC = () => {
  const audience = [
    {
      icon: Target,
      title: "Exporters",
      tagline: "Looking for new buyer enquiries",
      desc: "Connect with international buyers, sourcing agents, and trade brokers looking for Indian products.",
    },
    {
      icon: Truck,
      title: "Importers",
      tagline: "Searching for Indian suppliers",
      desc: "Discover verified manufacturers, direct growers, and reliable merchant exporters.",
    },
    {
      icon: Factory,
      title: "Manufacturers",
      tagline: "Expanding customer base",
      desc: "Promote your production capacity and supply direct to global merchant exporters.",
    },
    {
      icon: Search,
      title: "Suppliers",
      tagline: "Looking for new connections",
      desc: "Offer raw materials, packaging, logistics, and trade services to active exporters.",
    },
    {
      icon: Globe,
      title: "Traders & Distributors",
      tagline: "Building multi-product portfolio",
      desc: "Access diverse product lines across agriculture, textiles, spices, chemicals, and handicrafts.",
    },
    {
      icon: Sprout,
      title: "Beginners",
      tagline: "Entering Export-Import",
      desc: "Learn real market practices, understand documentation needs, and network with experienced traders.",
    },
  ];

  return (
    <section id="who-should-join" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Target Audience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
            Who Should Join?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Our community is tailored specifically for businesses and individuals active or starting in foreign trade.
          </p>
        </div>

        {/* Responsive Desktop & Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audience.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <span className="text-xs font-semibold text-emerald-700 block">{item.tagline}</span>
                    </div>
                  </div>
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
