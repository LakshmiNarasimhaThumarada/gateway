"use client";

import React from "react";
import Link from "next/link";
import { Globe2, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
            EX
          </div>
          <div className="flex flex-col">
            <span className="leading-none text-slate-900 font-bold">EXIM NETWORK</span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Export-Import Community</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#what-you-get" className="hover:text-emerald-600 transition-colors">
            What You Get
          </a>
          <a href="#who-should-join" className="hover:text-emerald-600 transition-colors">
            Who Should Join
          </a>
          <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-emerald-600 transition-colors">
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Business Network</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <span>Get Group Access</span>
            <span className="bg-emerald-700 text-emerald-100 text-xs px-2 py-0.5 rounded font-bold">
              ₹199
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
