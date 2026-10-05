import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Export-Import Business Community",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center font-bold">
              EX
            </div>
            <span>Export-Import Community</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-emerald-700 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="text-slate-600 text-sm">
            Have questions about your registration or community access? Reach out to our trade support desk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <MessageCircle className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm mb-1">WhatsApp Support</h3>
              <p className="text-xs text-slate-600 mb-3">+91 98765 43210</p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <Mail className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm mb-1">Email Desk</h3>
              <p className="text-xs text-slate-600 mb-3">support@eximpcommunity.com</p>
              <span className="text-xs text-slate-500">24-48 hr response time</span>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
              <MapPin className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 text-sm mb-1">Office Location</h3>
              <p className="text-xs text-slate-600">Export Facilitation Hub, India</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
