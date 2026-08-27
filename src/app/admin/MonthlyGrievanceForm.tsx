"use client";

import { useState } from "react";
import { updateMonthlyGrievanceReportAction } from "@/app/actions";

interface MonthlyGrievanceFormProps {
  initialReport: {
    month: string;
    received: number;
    resolved: number;
    pending: number;
    carriedForward: number;
    updatedAt: string;
  };
}

export default function MonthlyGrievanceForm({ initialReport }: MonthlyGrievanceFormProps) {
  const [report, setReport] = useState(initialReport);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateMonthlyGrievanceReportAction(formData);

    setIsUpdating(false);
    if (res.success && res.data) {
      setReport(res.data);
      setMessage({ type: "success", text: "SEBI Monthly Grievance Report updated successfully!" });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update monthly grievance data." });
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 tracking-wider">
            SEBI Regulatory Reporting Desk
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Monthly Investor Grievance Disclosures
          </h3>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
          Published &amp; Live
        </span>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        As mandated by the SEBI Master Circular for RTAs, monthly complaint metrics must be updated by the 7th of every month. Updates are immediately reflected on the public portal.
      </p>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Reporting Month &amp; Year *
          </label>
          <input
            type="text"
            name="month"
            required
            defaultValue={report.month}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="e.g. August 2026"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Carried Forward
            </label>
            <input
              type="number"
              name="carriedForward"
              min="0"
              required
              defaultValue={report.carriedForward}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-center focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
              Received
            </label>
            <input
              type="number"
              name="received"
              min="0"
              required
              defaultValue={report.received}
              className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-blue-50/40 text-xs font-bold text-center focus:ring-2 focus:ring-indigo-500 outline-none text-blue-900"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Resolved
            </label>
            <input
              type="number"
              name="resolved"
              min="0"
              required
              defaultValue={report.resolved}
              className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50/40 text-xs font-bold text-center focus:ring-2 focus:ring-indigo-500 outline-none text-emerald-900"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1">
              Pending
            </label>
            <input
              type="number"
              name="pending"
              min="0"
              required
              defaultValue={report.pending}
              className="w-full px-3 py-2 rounded-lg border border-rose-200 bg-rose-50/40 text-xs font-bold text-center focus:ring-2 focus:ring-indigo-500 outline-none text-rose-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-2.5 rounded-lg bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
        >
          {isUpdating ? "Publishing SEBI Report..." : "Publish Updated SEBI Monthly Report"}
        </button>
      </form>
    </div>
  );
}
