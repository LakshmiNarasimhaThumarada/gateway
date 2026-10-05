"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { CustomerRecord } from "@/lib/store";

interface StatsData {
  totalRegistrations: number;
  paidCustomers: number;
  pendingVerification: number;
  approvedCustomers: number;
  rejectedCustomers: number;
  groupAccessSent: number;
  todayRevenue: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
          setCustomers(data.data || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time Export-Import Community sales & verification tracking
            </p>
          </div>

          <Link
            href="/admin/customers"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Manage All Registrations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              
              {/* Total Registrations */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Registrations</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">{stats?.totalRegistrations || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Lead count</span>
              </div>

              {/* Paid Customers */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Paid Customers</span>
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">{stats?.paidCustomers || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">₹199 paid users</span>
              </div>

              {/* Pending Verification */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Under Review</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-amber-400">{stats?.pendingVerification || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Awaiting admin review</span>
              </div>

              {/* Approved Customers */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Approved</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-blue-400">{stats?.approvedCustomers || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Verified trade profiles</span>
              </div>

              {/* Total Revenue */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">₹{stats?.totalRevenue.toLocaleString() || 0}</div>
                <span className="text-[11px] text-emerald-400 mt-1 block">Verified payments</span>
              </div>

              {/* Today's Revenue */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Today's Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">₹{stats?.todayRevenue.toLocaleString() || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Last 24 hours</span>
              </div>

              {/* Group Access Sent */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Group Access Sent</span>
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-purple-400">{stats?.groupAccessSent || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">WhatsApp link sent</span>
              </div>

              {/* Rejected Customers */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Rejected</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-3xl font-extrabold text-red-400">{stats?.rejectedCustomers || 0}</div>
                <span className="text-[11px] text-slate-500 mt-1 block">Declined profiles</span>
              </div>

            </div>

            {/* Recent Registrations Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Recent Customer Registrations</h2>
                <Link
                  href="/admin/customers"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  View All →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3 rounded-l-lg">Reg ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Business Type</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-r-lg text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {customers.slice(0, 5).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-white">{c.registrationId}</td>
                        <td className="p-3 font-semibold text-slate-200">{c.fullName}</td>
                        <td className="p-3 font-mono">{c.phone}</td>
                        <td className="p-3">
                          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                            {c.businessType}
                          </span>
                        </td>
                        <td className="p-3">{c.city}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              c.status === "GROUP_ACCESS_SENT" || c.status === "APPROVED"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : c.status === "UNDER_REVIEW"
                                ? "bg-amber-500/20 text-amber-400"
                                : c.status === "REJECTED"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3 text-right text-slate-400">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
