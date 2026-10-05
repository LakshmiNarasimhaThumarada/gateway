"use client";

import React from "react";
import { Building2, Globe2, Network, ShieldCheck } from "lucide-react";

export const NetworkingSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Networking Feature Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm mb-16">
          <div className="max-w-3xl">
            <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              B2B Business Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
              One Community. Multiple Business Connections.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Whether you are looking for buyers, suppliers, manufacturers, importers or export opportunities, the community is designed to help businesses discover relevant connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Direct Networking</h3>
                <p className="text-xs text-slate-600 leading-normal">
                  Engage directly with decision makers without middleman barriers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Industry Diversity</h3>
                <p className="text-xs text-slate-600 leading-normal">
                  Spices, Textiles, Agro, Chemicals, Engineering, Engineering & Goods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Admin Verification</h3>
                <p className="text-xs text-slate-600 leading-normal">
                  All profiles undergo manual review before community admission.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-lg">
              <Globe2 className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">About Exim Network</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                We are a dedicated business facilitation platform created to bring Indian exporters, global importers, and domestic manufacturers onto a unified communication channel.
              </p>
              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <p>✓ Focused B2B Networking</p>
                <p>✓ Zero Spam Enforcement</p>
                <p>✓ Verified Member Database</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Empowering International Trade Connections
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Export and import success relies on having fast, credible access to buyers, suppliers, and logistical partners. Our platform bridges the gap by providing a structured, verified business group where members can share real-time requirements.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We focus purely on trade networking and business communication. We do not promise guaranteed buyers or instant wealth, but provide an authentic environment for real trade connections.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
