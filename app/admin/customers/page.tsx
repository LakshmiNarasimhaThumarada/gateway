"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Send,
  Loader2,
  RefreshCw,
  Eye,
} from "lucide-react";
import { CustomerRecord } from "@/lib/store";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [businessFilter, setBusinessFilter] = useState("ALL");

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const fetchCustomers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (businessFilter !== "ALL") params.set("businessType", businessFilter);

    fetch(`/api/admin/customers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(data.data || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchQuery, statusFilter, businessFilter]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleApprove = async (id: string) => {
    if (!confirm("Approve customer and dispatch WhatsApp group access instructions?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/customers/${id}/approve`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      alert("Customer approved successfully!");
      fetchCustomers();
      if (selectedCustomer?.id === id) setSelectedCustomer(data.data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Approval failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectConfirm = async () => {
    if (!selectedCustomer) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/customers/${selectedCustomer.id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      alert("Customer rejected and WhatsApp notification sent.");
      setShowRejectModal(false);
      fetchCustomers();
      setSelectedCustomer(data.data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Rejection failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendGroupAccess = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/customers/${id}/send-group-access`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      alert("Group access link sent via WhatsApp!");
      fetchCustomers();
      if (selectedCustomer?.id === id) setSelectedCustomer(data.data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to send link");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Customer Registrations</h1>
            <p className="text-xs text-slate-400 mt-1">
              Verify customer registrations, approve trade access, or resend WhatsApp instructions
            </p>
          </div>

          <a
            href="/api/admin/export"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </a>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Name, Phone, Email, Reg ID, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="GROUP_ACCESS_SENT">GROUP_ACCESS_SENT</option>
              <option value="REJECTED">REJECTED</option>
              <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
              <option value="PAYMENT_FAILED">PAYMENT_FAILED</option>
            </select>
          </div>

          {/* Business Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={businessFilter}
              onChange={(e) => setBusinessFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Business Types</option>
              <option value="Exporter">Exporter</option>
              <option value="Importer">Importer</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Supplier">Supplier</option>
              <option value="Trader">Trader</option>
              <option value="Distributor">Distributor</option>
              <option value="Beginner">Beginner</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/90 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Registration ID</th>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Contact Phone</th>
                    <th className="p-3.5">Business Profile</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No registrations matching your filters.
                      </td>
                    </tr>
                  ) : (
                    customers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-mono font-bold text-white">{c.registrationId}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-200">{c.fullName}</div>
                          <div className="text-[11px] text-slate-500">{c.email}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{c.phone}</td>
                        <td className="p-3.5">
                          <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-medium">
                            {c.businessType}
                          </span>
                          {c.businessName && (
                            <span className="block text-[11px] text-slate-400 mt-0.5 truncate max-w-[150px]">
                              {c.businessName}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">{c.city}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                              c.status === "GROUP_ACCESS_SENT" || c.status === "APPROVED"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : c.status === "UNDER_REVIEW"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : c.status === "REJECTED"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedCustomer(c)}
                              title="View Details"
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {c.status === "UNDER_REVIEW" && (
                              <>
                                <button
                                  onClick={() => handleApprove(c.id)}
                                  disabled={actionLoading}
                                  title="Approve & Send Access"
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition-colors flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" /> Approve
                                </button>

                                <button
                                  onClick={() => {
                                    setSelectedCustomer(c);
                                    setShowRejectModal(true);
                                  }}
                                  disabled={actionLoading}
                                  title="Reject Registration"
                                  className="px-2 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" /> Reject
                                </button>
                              </>
                            )}

                            {(c.status === "APPROVED" || c.status === "GROUP_ACCESS_SENT") && (
                              <button
                                onClick={() => handleSendGroupAccess(c.id)}
                                disabled={actionLoading}
                                title="Resend Group Link"
                                className="px-2 py-1 bg-purple-950 hover:bg-purple-900 text-purple-300 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 border border-purple-800"
                              >
                                <Send className="w-3 h-3" /> Resend Link
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View Customer Details Modal */}
        {selectedCustomer && !showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCustomer.fullName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedCustomer.registrationId}</p>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Phone</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">WhatsApp</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.whatsappNumber}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Email</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Business Type</span>
                    <span className="font-semibold text-emerald-400">{selectedCustomer.businessType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Company Name</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.businessName || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.city}, {selectedCustomer.state || "India"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Interested In</span>
                    <span className="font-semibold text-slate-200">{selectedCustomer.interestedIn}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">UTM Source Info</span>
                  <span className="font-mono text-slate-300 text-[11px]">{selectedCustomer.source || "Direct"}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-2">
                {selectedCustomer.status === "UNDER_REVIEW" && (
                  <button
                    onClick={() => handleApprove(selectedCustomer.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg"
                  >
                    Approve & Dispatches Access
                  </button>
                )}
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Reject Registration</h3>
              <p className="text-xs text-slate-400 mb-4">
                Please enter rejection reason for {selectedCustomer.fullName} ({selectedCustomer.registrationId}):
              </p>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Incomplete or unverified trade credentials provided."
                className="w-full h-24 p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
