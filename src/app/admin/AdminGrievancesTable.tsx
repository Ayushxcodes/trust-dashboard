"use client";

import { useState } from "react";
import { updateGrievanceStatusAction } from "@/app/actions";
import { GrievanceRecord } from "@/lib/db";

interface AdminGrievancesTableProps {
  initialGrievances: GrievanceRecord[];
}

export default function AdminGrievancesTable({ initialGrievances }: AdminGrievancesTableProps) {
  const [grievances, setGrievances] = useState<GrievanceRecord[]>(initialGrievances);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editingTicket, setEditingTicket] = useState<GrievanceRecord | null>(null);
  const [newStatus, setNewStatus] = useState<GrievanceRecord["status"]>("IN_PROCESSING");
  const [newRemarks, setNewRemarks] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filteredGrievances = grievances.filter((g) => {
    const matchesSearch =
      g.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      g.investorName.toLowerCase().includes(search.toLowerCase()) ||
      g.companyName.toLowerCase().includes(search.toLowerCase()) ||
      g.folioOrPan.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || g.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (g: GrievanceRecord) => {
    setEditingTicket(g);
    setNewStatus(g.status);
    setNewRemarks(g.remarks);
    setMessage(null);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTicket) return;

    setIsUpdating(true);
    setMessage(null);

    const res = await updateGrievanceStatusAction(editingTicket.ticketId, newStatus, newRemarks);
    setIsUpdating(false);

    if (res.success) {
      setGrievances((prev) =>
        prev.map((g) =>
          g.ticketId === editingTicket.ticketId
            ? { ...g, status: newStatus, remarks: newRemarks, updatedAt: new Date().toISOString() }
            : g
        )
      );
      setMessage({ type: "success", text: `Ticket ${editingTicket.ticketId} updated successfully!` });
      setTimeout(() => {
        setEditingTicket(null);
      }, 1200);
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update ticket status." });
    }
  };

  const getStatusBadge = (status: GrievanceRecord["status"]) => {
    switch (status) {
      case "RECEIVED":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
            RECEIVED
          </span>
        );
      case "IN_PROCESSING":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            IN PROCESSING
          </span>
        );
      case "ESCALATED_LEVEL2":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
            ESCALATED (LEVEL 2)
          </span>
        );
      case "RESOLVED":
        return (
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            RESOLVED
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Ticket ID, Investor Name, Folio, or Issuer..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 font-semibold"
          />
          <svg className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-200 text-xs font-bold bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="ALL">All Statuses ({grievances.length})</option>
            <option value="IN_PROCESSING">In Processing</option>
            <option value="ESCALATED_LEVEL2">Escalated (Level 2)</option>
            <option value="RESOLVED">Resolved</option>
            <option value="RECEIVED">Received</option>
          </select>
        </div>
      </div>

      {/* Grievances List Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Ticket ID</th>
                <th className="p-4">Investor &amp; Folio/PAN</th>
                <th className="p-4">Issuer &amp; Category</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredGrievances.map((g) => (
                <tr key={g.ticketId} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-[#0B1528] whitespace-nowrap">
                    {g.ticketId}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{g.investorName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{g.folioOrPan}</div>
                    <div className="text-[10px] text-slate-400">{g.email} • {g.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{g.companyName}</div>
                    <div className="text-[11px] text-slate-500">{g.category}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                    {new Date(g.submittedOn).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(g.status)}
                  </td>
                  <td className="p-4 pr-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(g)}
                      className="px-3 py-1.5 rounded-lg bg-[#0B1528] hover:bg-[#1E293B] text-white text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}

              {filteredGrievances.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-400 text-xs font-semibold">
                    No statutory grievance records match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal / Drawer */}
      {editingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Update Statutory Status
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Ticket #{editingTicket.ticketId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTicket(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div><strong className="text-slate-900">Investor:</strong> {editingTicket.investorName} ({editingTicket.folioOrPan})</div>
              <div><strong className="text-slate-900">Issuer:</strong> {editingTicket.companyName}</div>
              <div><strong className="text-slate-900">Category:</strong> {editingTicket.category}</div>
              <div className="text-[11px] text-slate-600 mt-1 italic">&quot;{editingTicket.description}&quot;</div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Statutory Processing Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as GrievanceRecord["status"])}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold bg-white focus:ring-2 focus:ring-slate-400 outline-none"
                >
                  <option value="RECEIVED">RECEIVED - Logged in Register</option>
                  <option value="IN_PROCESSING">IN_PROCESSING - Level 1 RTA Active Verification</option>
                  <option value="ESCALATED_LEVEL2">ESCALATED_LEVEL2 - Nodal Compliance Officer</option>
                  <option value="RESOLVED">RESOLVED - Dispatched / Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Official Processing Remarks (Visible to Investor) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newRemarks}
                  onChange={(e) => setNewRemarks(e.target.value)}
                  placeholder="Enter official investigation notes, dispatch details, or resolution remarks..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-slate-400 outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTicket(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-lg bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
                >
                  {isUpdating ? "Saving..." : "Save & Publish Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
