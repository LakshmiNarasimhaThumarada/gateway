import React from "react";
import Link from "next/link";
import { Phone, Mail, User } from "lucide-react";

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
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
            <p className="text-slate-500 text-sm mt-1">Business and customer support information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Business Owner */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <User className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Legal name / Business owner</h3>
              <p className="text-sm font-semibold text-slate-800">ABHISHEK CHETTIPALLI</p>
            </div>

            {/* Email */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <Mail className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Email</h3>
              <a
                href="mailto:abhishekbobby10@gmail.com"
                className="text-sm text-emerald-700 font-medium hover:underline break-all"
              >
                abhishekbobby10@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <Phone className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Phone</h3>
              <a
                href="tel:+918205320301"
                className="text-sm text-emerald-700 font-medium hover:underline"
              >
                +91 82053 20301
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
