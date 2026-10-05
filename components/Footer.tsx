"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base">
                EX
              </div>
              <span>EXIM NETWORK</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Private B2B networking platform connecting verified Indian exporters, manufacturers, and international trade buyers.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#what-you-get" className="hover:text-emerald-400 transition-colors">
                  What You Get
                </a>
              </li>
              <li>
                <a href="#who-should-join" className="hover:text-emerald-400 transition-colors">
                  Who Should Join
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-emerald-400 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@eximpcommunity.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>India Trade Facilitation Desk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="border-t border-slate-800/80 pt-6 pb-4 text-[11px] text-slate-500 leading-normal">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This website is an independent business networking community platform. We facilitate business communication between exporters, importers, and manufacturers. We do not guarantee buyers, guaranteed profits, or guaranteed exports. All business transactions between community members are conducted independently.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-900 pt-6">
          <p>© {new Date().getFullYear()} Export-Import Business Community. All rights reserved.</p>
          <div className="mt-2 sm:mt-0 flex gap-4">
            <Link href="/contact" className="hover:text-slate-300">Contact Us</Link>
            <Link href="/admin/login" className="hover:text-slate-300">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
