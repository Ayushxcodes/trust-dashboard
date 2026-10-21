"use client";

import { useState } from "react";
import Link from "next/link";
import {
  updateAnnexure26ReportAction,
  concludeAndRolloverMonthAction,
} from "@/app/actions";
import {
  Annexure26Report,
  ComplaintSourceData,
  MonthlyTrendData,
  AnnualTrendData,
  calculateSourceWiseTotals,
  calculateMonthlyTrendTotals,
  calculateAnnualTrendTotals,
} from "@/lib/annexure26-types";

interface MonthlyGrievanceFormProps {
  initialReport?: {
    month: string;
    received: number;
    resolved: number;
    pending: number;
    carriedForward: number;
    updatedAt: string;
  };
  initialAnnexureData?: Annexure26Report;
}

const DEFAULT_SOURCES: ComplaintSourceData[] = [
  {
    sn: 1,
    source: "Directly from Investors",
    carriedForward: 0,
    received: 0,
    totalPending: 0,
    resolved: 0,
    pendingLessThan3Months: 0,
    pendingMoreThan3Months: 0,
    averageResolutionDays: 0,
  },
  {
    sn: 2,
    source: "SEBI (SCORES 2.0)",
    carriedForward: 0,
    received: 0,
    totalPending: 0,
    resolved: 0,
    pendingLessThan3Months: 0,
    pendingMoreThan3Months: 0,
    averageResolutionDays: 0,
  },
  {
    sn: 3,
    source: "Stock Exchanges (if relevant)",
    carriedForward: 0,
    received: 0,
    totalPending: 0,
    resolved: 0,
    pendingLessThan3Months: 0,
    pendingMoreThan3Months: 0,
    averageResolutionDays: 0,
  },
  {
    sn: 4,
    source: "Other Sources (if any)",
    carriedForward: 0,
    received: 0,
    totalPending: 0,
    resolved: 0,
    pendingLessThan3Months: 0,
    pendingMoreThan3Months: 0,
    averageResolutionDays: 0,
  },
];

const STANDARD_FY_MONTHS = [
  "April - 2026",
  "May - 2026",
  "June - 2026",
  "July - 2026",
  "August - 2026",
  "September - 2026",
  "October - 2026",
  "November - 2026",
  "December - 2026",
  "January - 2027",
  "February - 2027",
  "March - 2027",
];

const STANDARD_FYS = ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26", "2026-27"];

export default function MonthlyGrievanceForm({
  initialReport,
  initialAnnexureData,
}: MonthlyGrievanceFormProps) {
  const [data, setData] = useState<Annexure26Report>(() => {
    if (initialAnnexureData) {
      return initialAnnexureData;
    }
    return {
      annexureTitle: "Annexure-26",
      subTitle:
        "Data of complaints against Registrars to an Issue and Share Transfer Agents (RTAs) to be displayed on their websites",
      monthEnding: initialReport?.month || "October 2026",
      financialYear: "2026-27",
      updatedAt: new Date().toISOString(),
      sourceWiseData: DEFAULT_SOURCES,
      monthlyTrend: [],
      annualTrend: [],
    };
  });

  const [activeTab, setActiveTab] = useState<"table1" | "table2" | "table3" | "snapshots">("table1");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConcluding, setIsConcluding] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Derived calculations
  const sourceTotals = calculateSourceWiseTotals(data.sourceWiseData);
  const monthlyTotals = calculateMonthlyTrendTotals(data.monthlyTrend);
  const annualTotals = calculateAnnualTrendTotals(data.annualTrend);

  // Manual Conclude & Rollover Handler
  const handleConcludeAndRollover = async () => {
    if (
      !window.confirm(
        `Are you sure you want to conclude and archive "${data.monthEnding}"?\n\n` +
          `This will:\n` +
          `1. Save this month's final snapshot in the PostgreSQL database.\n` +
          `2. Add "${data.monthEnding}" to Table 2 (Monthly Disposal Trend).\n` +
          `3. Rollover all remaining pending complaints into the next month's Carried Forward.\n` +
          `4. Initialize the new active month.`
      )
    ) {
      return;
    }

    setIsConcluding(true);
    setMessage(null);
    try {
      const res = await concludeAndRolloverMonthAction(data.monthEnding);
      if (res.success && res.data) {
        setData(res.data);
        setMessage({
          type: "success",
          text: `Month "${data.monthEnding}" successfully archived into PostgreSQL DB! Table 2 and next month have been automatically updated.`,
        });
        setActiveTab("snapshots");
      } else {
        setMessage({
          type: "error",
          text: res.error || "Failed to conclude month and rollover.",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to conclude month.",
      });
    } finally {
      setIsConcluding(false);
    }
  };

  // Table 1 handler
  const handleSourceFieldChange = (
    index: number,
    field: keyof ComplaintSourceData,
    value: number | string
  ) => {
    setData((prev) => {
      const updatedSources = [...prev.sourceWiseData];
      const target = { ...updatedSources[index], [field]: value };
      // auto compute totalPending
      target.totalPending = (target.carriedForward || 0) + (target.received || 0);
      updatedSources[index] = target;
      return { ...prev, sourceWiseData: updatedSources };
    });
  };

  // Table 2 handlers
  const handleAddMonth = () => {
    setData((prev) => {
      const newSn = prev.monthlyTrend.length + 1;
      const newEntry: MonthlyTrendData = {
        sn: newSn,
        month: `Month ${newSn}`,
        carriedForward: 0,
        received: 0,
        resolved: 0,
        pending: 0,
      };
      return { ...prev, monthlyTrend: [...prev.monthlyTrend, newEntry] };
    });
  };

  const handleInitializeFYMonths = () => {
    const list: MonthlyTrendData[] = STANDARD_FY_MONTHS.map((m, idx) => ({
      sn: idx + 1,
      month: m,
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    }));
    setData((prev) => ({ ...prev, monthlyTrend: list }));
  };

  const handleClearMonths = () => {
    setData((prev) => ({ ...prev, monthlyTrend: [] }));
  };

  const handleMonthlyFieldChange = (
    index: number,
    field: keyof MonthlyTrendData,
    value: number | string
  ) => {
    setData((prev) => {
      const updated = [...prev.monthlyTrend];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, monthlyTrend: updated };
    });
  };

  const handleDeleteMonth = (index: number) => {
    setData((prev) => {
      const updated = prev.monthlyTrend
        .filter((_, i) => i !== index)
        .map((row, idx) => ({ ...row, sn: idx + 1 }));
      return { ...prev, monthlyTrend: updated };
    });
  };

  // Table 3 handlers
  const handleAddYear = () => {
    setData((prev) => {
      const newSn = prev.annualTrend.length + 1;
      const newEntry: AnnualTrendData = {
        sn: newSn,
        year: `202${newSn}-${newSn + 1}`,
        carriedForward: 0,
        received: 0,
        resolved: 0,
        pending: 0,
      };
      return { ...prev, annualTrend: [...prev.annualTrend, newEntry] };
    });
  };

  const handleInitializeFYYears = () => {
    const list: AnnualTrendData[] = STANDARD_FYS.map((y, idx) => ({
      sn: idx + 1,
      year: y,
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    }));
    setData((prev) => ({ ...prev, annualTrend: list }));
  };

  const handleClearYears = () => {
    setData((prev) => ({ ...prev, annualTrend: [] }));
  };

  const handleAnnualFieldChange = (
    index: number,
    field: keyof AnnualTrendData,
    value: number | string
  ) => {
    setData((prev) => {
      const updated = [...prev.annualTrend];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, annualTrend: updated };
    });
  };

  const handleDeleteYear = (index: number) => {
    setData((prev) => {
      const updated = prev.annualTrend
        .filter((_, i) => i !== index)
        .map((row, idx) => ({ ...row, sn: idx + 1 }));
      return { ...prev, annualTrend: updated };
    });
  };

  // Submit all
  const handleSaveAll = async () => {
    setIsUpdating(true);
    setMessage(null);

    const res = await updateAnnexure26ReportAction(data);

    setIsUpdating(false);
    if (res.success && res.data) {
      setData(res.data);
      setMessage({
        type: "success",
        text: `SEBI Annexure-26 Disclosures for '${data.monthEnding}' saved and published live! Front end now reflects only these admin-fed records.`,
      });
    } else {
      setMessage({
        type: "error",
        text: res.error || "Failed to save Annexure-26 data.",
      });
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              SEBI Statutory Control Desk
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              Live DB Mode
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1">
            SEBI Annexure-26 Complaints Disclosure Manager
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Only data fed here will be published to the public investor portal. Zero hardcoded static figures.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/investor/investor-grievances-reports"
            target="_blank"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-200 transition-colors flex items-center gap-1.5"
          >
            <span>Preview Public View</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{message.type === "success" ? "✓" : "✕"}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Period Metadata Settings */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Active Reporting Month Ending *
            </label>
            <input
              type="text"
              value={data.monthEnding}
              onChange={(e) => setData({ ...data, monthEnding: e.target.value })}
              placeholder="e.g. October 2026 or October 31, 2026"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Financial Year *
            </label>
            <input
              type="text"
              value={data.financialYear}
              onChange={(e) => setData({ ...data, financialYear: e.target.value })}
              placeholder="e.g. 2026-27"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Month-End Automation & Rollover bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-800">Month-End DB Automation:</span>{" "}
            When a calendar month ends, the system automatically archives its data into PostgreSQL, registers it in Table 2, and rolls pending complaints forward to the next month. You can also conclude the active month manually here.
          </div>
          <button
            type="button"
            onClick={handleConcludeAndRollover}
            disabled={isConcluding || isUpdating}
            className="shrink-0 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isConcluding ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Archiving to DB...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Conclude &amp; Archive Current Month</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-zinc-200 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("table1")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
            activeTab === "table1"
              ? "border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          1. Month Ending Sources (Table 1)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("table2")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === "table2"
              ? "border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <span>2. Monthly Disposal Trend (Table 2)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700">
            {data.monthlyTrend.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("table3")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === "table3"
              ? "border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <span>3. Annual (FY) Disposal Trend (Table 3)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700">
            {data.annualTrend.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("snapshots")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === "snapshots"
              ? "border-indigo-600 text-indigo-600 bg-indigo-50/40 rounded-t-lg"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <span>4. Database Snapshots Archive</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
            {data.archivedMonths?.length || 0}
          </span>
        </button>
      </div>

      {/* TAB 1: MONTH ENDING SOURCES */}
      {activeTab === "table1" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
              Enter complaints data for each regulatory source for <strong>{data.monthEnding}</strong>.
            </span>
            <span className="font-mono text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
              Total Pending = Carried Forward + Received
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider">
                  <th className="p-2.5 text-center w-8">SN</th>
                  <th className="p-2.5 min-w-[170px]">Source</th>
                  <th className="p-2.5 text-center w-24">Carried Fwd</th>
                  <th className="p-2.5 text-center w-24">Received</th>
                  <th className="p-2.5 text-center w-24">Total Pending</th>
                  <th className="p-2.5 text-center w-24">Resolved*</th>
                  <th className="p-2.5 text-center w-24">Pending &lt;3m</th>
                  <th className="p-2.5 text-center w-24">Pending &gt;3m</th>
                  <th className="p-2.5 text-center w-24">Avg Days^</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {data.sourceWiseData.map((row, idx) => (
                  <tr key={row.sn} className="hover:bg-slate-50/70">
                    <td className="p-2 text-center font-bold text-slate-500">{row.sn}</td>
                    <td className="p-2 font-bold text-slate-900">{row.source}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={row.carriedForward}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "carriedForward", parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={row.received}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "received", parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full p-1 text-center font-bold text-blue-800 bg-blue-50/40 border border-blue-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="p-2 text-center font-black text-slate-800 bg-slate-50/50">
                      {row.carriedForward + row.received}
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={row.resolved}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "resolved", parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full p-1 text-center font-bold text-emerald-800 bg-emerald-50/40 border border-emerald-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={row.pendingLessThan3Months}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "pendingLessThan3Months", parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        value={row.pendingMoreThan3Months}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "pendingMoreThan3Months", parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full p-1 text-center font-bold text-rose-800 bg-rose-50/40 border border-rose-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={row.averageResolutionDays}
                        onChange={(e) =>
                          handleSourceFieldChange(idx, "averageResolutionDays", parseFloat(e.target.value) || 0)
                        }
                        className="w-full p-1 text-center font-mono font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                  </tr>
                ))}

                {/* Grand Total row */}
                <tr className="bg-indigo-50/80 font-black text-slate-900 border-t-2 border-indigo-200">
                  <td className="p-2 text-center">5</td>
                  <td className="p-2 uppercase tracking-wider text-indigo-950">Grand Total</td>
                  <td className="p-2 text-center">{sourceTotals.carriedForward}</td>
                  <td className="p-2 text-center text-blue-900">{sourceTotals.received}</td>
                  <td className="p-2 text-center">{sourceTotals.totalPending}</td>
                  <td className="p-2 text-center text-emerald-900">{sourceTotals.resolved}</td>
                  <td className="p-2 text-center">{sourceTotals.pendingLessThan3Months}</td>
                  <td className="p-2 text-center text-rose-900">{sourceTotals.pendingMoreThan3Months}</td>
                  <td className="p-2 text-center font-mono">{sourceTotals.averageResolutionDays} d</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MONTHLY DISPOSAL TREND */}
      {activeTab === "table2" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-600">
              Only months added here are shown in Table 2 on the front end. If empty, the website shows no records.
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddMonth}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                + Add Month
              </button>
              <button
                type="button"
                onClick={handleInitializeFYMonths}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Fill 12 FY Months
              </button>
              {data.monthlyTrend.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearMonths}
                  className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {data.monthlyTrend.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-xs font-bold text-slate-600">No monthly trend records fed yet.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Click &quot;Fill 12 FY Months&quot; or &quot;+ Add Month&quot; to begin entering disposal figures.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider">
                    <th className="p-2.5 text-center w-8">SN</th>
                    <th className="p-2.5 min-w-[160px]">Month</th>
                    <th className="p-2.5 text-center w-28">Carried Fwd</th>
                    <th className="p-2.5 text-center w-28">Received</th>
                    <th className="p-2.5 text-center w-28">Resolved*</th>
                    <th className="p-2.5 text-center w-28">Pending**</th>
                    <th className="p-2.5 text-center w-12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {data.monthlyTrend.map((row, idx) => (
                    <tr key={row.sn} className="hover:bg-slate-50/70">
                      <td className="p-2 text-center font-bold text-slate-500">{row.sn}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.month}
                          onChange={(e) => handleMonthlyFieldChange(idx, "month", e.target.value)}
                          className="w-full p-1 font-bold text-slate-900 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.carriedForward}
                          onChange={(e) =>
                            handleMonthlyFieldChange(idx, "carriedForward", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.received}
                          onChange={(e) =>
                            handleMonthlyFieldChange(idx, "received", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold text-blue-800 bg-blue-50/40 border border-blue-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.resolved}
                          onChange={(e) =>
                            handleMonthlyFieldChange(idx, "resolved", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold text-emerald-800 bg-emerald-50/40 border border-emerald-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.pending}
                          onChange={(e) =>
                            handleMonthlyFieldChange(idx, "pending", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteMonth(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1"
                          title="Remove Month"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Monthly Trend Grand Total */}
                  <tr className="bg-indigo-50/80 font-black text-slate-900 border-t-2 border-indigo-200">
                    <td className="p-2 text-center">—</td>
                    <td className="p-2 uppercase tracking-wider text-indigo-950">Grand Total</td>
                    <td className="p-2 text-center">{monthlyTotals.carriedForward}</td>
                    <td className="p-2 text-center text-blue-900">{monthlyTotals.received}</td>
                    <td className="p-2 text-center text-emerald-900">{monthlyTotals.resolved}</td>
                    <td className="p-2 text-center">{monthlyTotals.pending}</td>
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ANNUAL DISPOSAL TREND */}
      {activeTab === "table3" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-600">
              Only years added here are shown in Table 3 on the front end. If empty, the website shows no records.
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddYear}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                + Add Financial Year
              </button>
              <button
                type="button"
                onClick={handleInitializeFYYears}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Fill Standard FYs
              </button>
              {data.annualTrend.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearYears}
                  className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {data.annualTrend.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-xs font-bold text-slate-600">No annual trend records fed yet.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Click &quot;Fill Standard FYs&quot; or &quot;+ Add Financial Year&quot; to begin entering multi-year figures.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider">
                    <th className="p-2.5 text-center w-8">SN</th>
                    <th className="p-2.5 min-w-[160px]">Financial Year</th>
                    <th className="p-2.5 text-center w-28">Carried Fwd</th>
                    <th className="p-2.5 text-center w-28">Received</th>
                    <th className="p-2.5 text-center w-28">Resolved</th>
                    <th className="p-2.5 text-center w-28">Pending</th>
                    <th className="p-2.5 text-center w-12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {data.annualTrend.map((row, idx) => (
                    <tr key={row.sn} className="hover:bg-slate-50/70">
                      <td className="p-2 text-center font-bold text-slate-500">{row.sn}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.year}
                          onChange={(e) => handleAnnualFieldChange(idx, "year", e.target.value)}
                          className="w-full p-1 font-bold text-slate-900 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.carriedForward}
                          onChange={(e) =>
                            handleAnnualFieldChange(idx, "carriedForward", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.received}
                          onChange={(e) =>
                            handleAnnualFieldChange(idx, "received", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold text-blue-800 bg-blue-50/40 border border-blue-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.resolved}
                          onChange={(e) =>
                            handleAnnualFieldChange(idx, "resolved", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold text-emerald-800 bg-emerald-50/40 border border-emerald-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          value={row.pending}
                          onChange={(e) =>
                            handleAnnualFieldChange(idx, "pending", parseInt(e.target.value, 10) || 0)
                          }
                          className="w-full p-1 text-center font-bold border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteYear(idx)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1"
                          title="Remove Year"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Annual Trend Grand Total */}
                  <tr className="bg-indigo-50/80 font-black text-slate-900 border-t-2 border-indigo-200">
                    <td className="p-2 text-center">—</td>
                    <td className="p-2 uppercase tracking-wider text-indigo-950">Grand Total</td>
                    <td className="p-2 text-center">{annualTotals.carriedForward}</td>
                    <td className="p-2 text-center text-blue-900">{annualTotals.received}</td>
                    <td className="p-2 text-center text-emerald-900">{annualTotals.resolved}</td>
                    <td className="p-2 text-center">{annualTotals.pending}</td>
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DATABASE SNAPSHOTS ARCHIVE */}
      {activeTab === "snapshots" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
            <div>
              <p className="font-semibold text-slate-800">
                PostgreSQL Monthly Snapshots Archive
              </p>
              <p className="text-[11px] text-slate-500">
                Each month-end is permanently archived in the database. When a month closes, its summary is logged to Table 2 (Disposal Trend) and remaining pending complaints rollover automatically.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {data.archivedMonths?.length || 0} Snapshots Stored
              </span>
            </div>
          </div>

          {!data.archivedMonths || data.archivedMonths.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16m-9 4h2m-2 4h2" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-700">No Historical Snapshots in Database Yet</p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1">
                When you click &ldquo;Conclude &amp; Archive Current Month&rdquo; or when a calendar month automatically ends, the snapshot will appear here and be permanently stored in the DB.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <th className="p-3 text-center w-12">SN</th>
                    <th className="p-3">Reporting Period</th>
                    <th className="p-3">Financial Year</th>
                    <th className="p-3 text-center">Carried Fwd</th>
                    <th className="p-3 text-center text-blue-700">Received</th>
                    <th className="p-3 text-center text-emerald-700">Resolved</th>
                    <th className="p-3 text-center text-amber-700">Pending</th>
                    <th className="p-3 text-center">Archived On</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.archivedMonths.map((snap, idx) => (
                    <tr key={snap.monthYear || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center font-mono text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <span>{snap.monthYear}</span>
                        {snap.isCurrent && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold tracking-wide">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600 font-semibold">{snap.financialYear}</td>
                      <td className="p-3 text-center font-bold text-slate-700">{snap.carriedForward}</td>
                      <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/30">{snap.received}</td>
                      <td className="p-3 text-center font-bold text-emerald-700 bg-emerald-50/30">{snap.resolved}</td>
                      <td className="p-3 text-center font-bold text-amber-700 bg-amber-50/30">{snap.pending}</td>
                      <td className="p-3 text-center text-[11px] text-slate-500 font-mono">
                        {snap.archivedAt
                          ? new Date(snap.archivedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="p-3 text-center">
                        {snap.isCurrent ? (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Current Active
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            Archived In DB
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isUpdating}
          className="w-full py-3 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isUpdating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Publishing Disclosures to Website...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Save &amp; Publish All Annexure-26 Disclosures</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
