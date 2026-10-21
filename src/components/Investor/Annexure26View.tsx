"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Annexure26Report,
  calculateSourceWiseTotals,
  calculateMonthlyTrendTotals,
  calculateAnnualTrendTotals,
} from "@/lib/annexure26-types";

interface Annexure26ViewProps {
  initialData: Annexure26Report;
}

export default function Annexure26View({ initialData }: Annexure26ViewProps) {
  const [data] = useState<Annexure26Report>(initialData);
  const [activeTab, setActiveTab] = useState<"all" | "month" | "monthlyTrend" | "annualTrend">("all");
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>("CURRENT");

  const archivedList = (data.archivedMonths || []).filter(
    (m) => m.monthYear.trim().toLowerCase() !== data.monthEnding.trim().toLowerCase()
  );

  // Determine which month data to display in Table 1
  const isViewingArchived = selectedMonthKey !== "CURRENT";
  const archivedRecord = isViewingArchived
    ? data.archivedMonths?.find((m) => m.monthYear === selectedMonthKey)
    : null;

  const displayedMonthEnding = archivedRecord ? archivedRecord.monthYear : data.monthEnding;
  const displayedSourceData = archivedRecord ? archivedRecord.sourceWiseData : data.sourceWiseData;

  const displayedSourceTotals = calculateSourceWiseTotals(displayedSourceData);
  const monthlyTotals = calculateMonthlyTrendTotals(data.monthlyTrend);
  const annualTotals = calculateAnnualTrendTotals(data.annualTrend);

  const formattedUpdateDate = new Date(data.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Top Banner / Compliance Badge Strip */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-mono font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
                Annexure-26
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SEBI Master Circular Mandate
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Category-I RTA Disclosure
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Data of Complaints Against RTA to be Displayed on Website
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Format for disclosing data of complaints on their website in accordance with SEBI Master Circular for Registrars to an Issue and Share Transfer Agents (RTAs).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Last Verified &amp; Published
              </span>
              <span className="text-xs font-bold text-slate-800 font-mono">
                {formattedUpdateDate}
              </span>
            </div>
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer print:hidden"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Quick Highlights Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-500 block">
              Reporting Month Ending
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block">
              {displayedMonthEnding}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              {isViewingArchived ? "Archived Statutory Period" : "Current Reporting Month"}
            </span>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
            <span className="text-[11px] font-mono uppercase font-bold text-blue-700 block">
              Complaints Received
            </span>
            <span className="text-2xl font-black text-blue-900 mt-1 block">
              {displayedSourceTotals.received}
            </span>
            <span className="text-[11px] text-blue-600 mt-0.5 block">During Month</span>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 block">
              Complaints Resolved*
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {displayedSourceTotals.resolved}
            </span>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">
              Avg Resolution: {displayedSourceTotals.averageResolutionDays} Days
            </span>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            <span className="text-[11px] font-mono uppercase font-bold text-amber-700 block">
              Pending at End of Month**
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {displayedSourceTotals.pendingLessThan3Months + displayedSourceTotals.pendingMoreThan3Months}
            </span>
            <span className="text-[11px] text-amber-600 mt-0.5 block">
              &gt; 3 Months: {displayedSourceTotals.pendingMoreThan3Months}
            </span>
          </div>
        </div>

        {/* View Filter Tabs & Global Period Selector (hidden in print) */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-[#0B1528] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All 3 Statutory Tables
            </button>
            <button
              onClick={() => setActiveTab("month")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "month"
                  ? "bg-[#0B1528] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              1. Month Ending Data
            </button>
            <button
              onClick={() => setActiveTab("monthlyTrend")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "monthlyTrend"
                  ? "bg-[#0B1528] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              2. Monthly Disposal Trend ({data.monthlyTrend.length})
            </button>
            <button
              onClick={() => setActiveTab("annualTrend")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "annualTrend"
                  ? "bg-[#0B1528] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              3. Annual Trend ({data.annualTrend.length})
            </button>
          </div>

          {/* Historical Period Selector */}
          {archivedList.length > 0 && (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Select Period:</span>
              </span>
              <select
                value={selectedMonthKey}
                onChange={(e) => {
                  setSelectedMonthKey(e.target.value);
                  if (activeTab === "monthlyTrend" || activeTab === "annualTrend") {
                    setActiveTab("all");
                  }
                }}
                className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                <option value="CURRENT">{data.monthEnding} (Current Reporting Month)</option>
                {archivedList.map((m) => (
                  <option key={m.id || m.monthYear} value={m.monthYear}>
                    {m.monthYear} (Archived Record)
                  </option>
                ))}
              </select>
              {isViewingArchived && (
                <button
                  type="button"
                  onClick={() => setSelectedMonthKey("CURRENT")}
                  className="px-2 py-0.5 rounded-md text-[11px] font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TABLE 1: Data for the month ending */}
      {(activeTab === "all" || activeTab === "month") && (
        <section id="table-month-ending" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-extrabold block">
                  Statutory Table 1 • SEBI Annexure-26
                </span>
                {isViewingArchived && (
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    Database Archived Snapshot
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Format for Disclosing Data of Complaints: Data for the Month Ending ({displayedMonthEnding})
              </h3>
            </div>

            {/* Month Selector Dropdown (When archived months exist in DB) */}
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              {archivedList.length > 0 && (
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-600 whitespace-nowrap">
                    Period:
                  </label>
                  <select
                    value={selectedMonthKey}
                    onChange={(e) => setSelectedMonthKey(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm cursor-pointer"
                  >
                    <option value="CURRENT">{data.monthEnding} (Current Reporting Month)</option>
                    {archivedList.map((m) => (
                      <option key={m.id || m.monthYear} value={m.monthYear}>
                        {m.monthYear} (Archived Record)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {isViewingArchived && (
                <button
                  type="button"
                  onClick={() => setSelectedMonthKey("CURRENT")}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                >
                  Back to Current Month
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-800 text-white font-extrabold text-[11px] uppercase tracking-wider">
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 text-center w-12">
                    SN
                  </th>
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 min-w-[200px]">
                    Received from
                  </th>
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 text-center">
                    Carried forward from previous month
                  </th>
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 text-center">
                    Received during the month
                  </th>
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 text-center">
                    Total Pending
                  </th>
                  <th rowSpan={2} className="p-3.5 border-r border-slate-700 text-center">
                    Resolved*
                  </th>
                  <th colSpan={2} className="p-2 border-r border-slate-700 text-center bg-slate-900">
                    Pending at the end of the month**
                  </th>
                  <th rowSpan={2} className="p-3.5 text-center min-w-[140px]">
                    Average Resolution time^ (in days)
                  </th>
                </tr>
                <tr className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider border-t border-slate-700">
                  <th className="p-2.5 border-r border-slate-700 text-center">
                    Pending for less than 3 months
                  </th>
                  <th className="p-2.5 border-r border-slate-700 text-center">
                    Pending for more than 3 months
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {displayedSourceData.map((row) => (
                  <tr key={row.sn} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-center font-bold text-slate-500 border-r border-slate-100">
                      {row.sn}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 border-r border-slate-100">
                      {row.source}
                    </td>
                    <td className="p-3.5 text-center border-r border-slate-100">
                      {row.carriedForward}
                    </td>
                    <td className="p-3.5 text-center font-semibold text-blue-700 border-r border-slate-100">
                      {row.received}
                    </td>
                    <td className="p-3.5 text-center font-semibold text-slate-800 border-r border-slate-100">
                      {row.totalPending}
                    </td>
                    <td className="p-3.5 text-center font-semibold text-emerald-700 border-r border-slate-100">
                      {row.resolved}
                    </td>
                    <td className="p-3.5 text-center border-r border-slate-100 font-medium">
                      {row.pendingLessThan3Months}
                    </td>
                    <td className="p-3.5 text-center border-r border-slate-100 font-medium text-rose-700">
                      {row.pendingMoreThan3Months}
                    </td>
                    <td className="p-3.5 text-center font-mono font-bold text-slate-700">
                      {row.averageResolutionDays > 0 ? `${row.averageResolutionDays} Days` : "0"}
                    </td>
                  </tr>
                ))}

                {/* Grand Total Row */}
                <tr className="bg-indigo-50/70 border-t-2 border-indigo-200 font-black text-slate-900 text-xs">
                  <td className="p-3.5 text-center border-r border-indigo-100 font-mono">
                    5
                  </td>
                  <td className="p-3.5 uppercase tracking-wider font-extrabold text-indigo-950 border-r border-indigo-100">
                    Grand Total
                  </td>
                  <td className="p-3.5 text-center border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.carriedForward}
                  </td>
                  <td className="p-3.5 text-center text-blue-800 border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.received}
                  </td>
                  <td className="p-3.5 text-center border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.totalPending}
                  </td>
                  <td className="p-3.5 text-center text-emerald-800 border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.resolved}
                  </td>
                  <td className="p-3.5 text-center border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.pendingLessThan3Months}
                  </td>
                  <td className="p-3.5 text-center text-rose-800 border-r border-indigo-100 font-bold">
                    {displayedSourceTotals.pendingMoreThan3Months}
                  </td>
                  <td className="p-3.5 text-center font-mono font-black text-indigo-950">
                    {displayedSourceTotals.averageResolutionDays > 0 ? `${displayedSourceTotals.averageResolutionDays} Days` : "0"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TABLE 2: Trend of monthly disposal of complaints */}
      {(activeTab === "all" || activeTab === "monthlyTrend") && (
        <section id="table-monthly-trend" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-extrabold block">
                Statutory Table 2 • SEBI Annexure-26
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Trend of Monthly Disposal of Complaints (FY {data.financialYear})
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Current Financial Year Breakdown
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-800 text-white font-extrabold text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 border-r border-slate-700 text-center w-12">
                    SN
                  </th>
                  <th className="p-3.5 border-r border-slate-700 min-w-[180px]">
                    Month
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Carried forward from previous month
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Received
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Resolved*
                  </th>
                  <th className="p-3.5 text-center">
                    Pending**
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {data.monthlyTrend.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 bg-slate-50/50">
                      <p className="text-sm font-semibold text-slate-700">No monthly disposal trend records published yet.</p>
                      <p className="text-xs text-slate-400 mt-1">Monthly trend figures will appear here once fed by the Compliance Officer from the Admin desk.</p>
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.monthlyTrend.map((row) => {
                      const isCurrentMonth =
                        row.month.toLowerCase().includes(data.monthEnding.toLowerCase()) ||
                        data.monthEnding.toLowerCase().includes(row.month.toLowerCase());
                      const matchingArchive = archivedList.find(
                        (m) =>
                          m.monthYear.toLowerCase().includes(row.month.toLowerCase()) ||
                          row.month.toLowerCase().includes(m.monthYear.toLowerCase())
                      );

                      return (
                        <tr
                          key={row.sn}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isCurrentMonth ? "bg-indigo-50/20 font-bold" : ""
                          }`}
                        >
                          <td className="p-3 text-center text-slate-500 border-r border-slate-100">
                            {row.sn}
                          </td>
                          <td className="p-3 font-bold text-slate-900 border-r border-slate-100">
                            <div className="flex items-center justify-between gap-2">
                              <span>{row.month}</span>
                              <div className="flex items-center gap-1.5">
                                {isCurrentMonth && (
                                  <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded font-bold">
                                    Current
                                  </span>
                                )}
                                {matchingArchive && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedMonthKey(matchingArchive.monthYear);
                                      setActiveTab("all");
                                      window.scrollTo({ top: 350, behavior: "smooth" });
                                    }}
                                    className="text-[10px] text-indigo-600 hover:text-indigo-800 underline font-semibold"
                                  >
                                    View Breakdown
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center border-r border-slate-100">
                            {row.carriedForward}
                          </td>
                          <td className="p-3 text-center font-semibold text-blue-700 border-r border-slate-100">
                            {row.received}
                          </td>
                          <td className="p-3 text-center font-semibold text-emerald-700 border-r border-slate-100">
                            {row.resolved}
                          </td>
                          <td className="p-3 text-center font-semibold text-slate-700">
                            {row.pending}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Monthly Trend Grand Total */}
                    <tr className="bg-indigo-50/70 border-t-2 border-indigo-200 font-black text-slate-900 text-xs">
                      <td className="p-3.5 text-center border-r border-indigo-100 font-mono">
                        —
                      </td>
                      <td className="p-3.5 uppercase tracking-wider font-extrabold text-indigo-950 border-r border-indigo-100">
                        Grand Total
                      </td>
                      <td className="p-3.5 text-center border-r border-indigo-100 font-bold">
                        {monthlyTotals.carriedForward}
                      </td>
                      <td className="p-3.5 text-center text-blue-800 border-r border-indigo-100 font-bold">
                        {monthlyTotals.received}
                      </td>
                      <td className="p-3.5 text-center text-emerald-800 border-r border-indigo-100 font-bold">
                        {monthlyTotals.resolved}
                      </td>
                      <td className="p-3.5 text-center text-slate-900 font-bold">
                        {monthlyTotals.pending}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TABLE 3: Trend of annual (Financial Year) disposal of complaints */}
      {(activeTab === "all" || activeTab === "annualTrend") && (
        <section id="table-annual-trend" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-extrabold block">
                Statutory Table 3 • SEBI Annexure-26
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Trend of Annual (Financial Year) Disposal of Complaints#
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Historical Multi-Year Track Record
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-800 text-white font-extrabold text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 border-r border-slate-700 text-center w-12">
                    SN
                  </th>
                  <th className="p-3.5 border-r border-slate-700 min-w-[160px]">
                    Year
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Carried forward from previous year
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Received
                  </th>
                  <th className="p-3.5 border-r border-slate-700 text-center">
                    Resolved
                  </th>
                  <th className="p-3.5 text-center">
                    Pending
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {data.annualTrend.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 bg-slate-50/50">
                      <p className="text-sm font-semibold text-slate-700">No annual financial year trend records published yet.</p>
                      <p className="text-xs text-slate-400 mt-1">Historical multi-year trend figures will appear here once fed by the Compliance Officer from the Admin desk.</p>
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.annualTrend.map((row) => (
                      <tr key={row.sn} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-center text-slate-500 border-r border-slate-100 font-bold">
                          {row.sn}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r border-slate-100">
                          {row.year}
                        </td>
                        <td className="p-3 text-center border-r border-slate-100">
                          {row.carriedForward}
                        </td>
                        <td className="p-3 text-center font-semibold text-blue-700 border-r border-slate-100">
                          {row.received}
                        </td>
                        <td className="p-3 text-center font-semibold text-emerald-700 border-r border-slate-100">
                          {row.resolved}
                        </td>
                        <td className="p-3 text-center font-semibold text-slate-700">
                          {row.pending}
                        </td>
                      </tr>
                    ))}

                    {/* Annual Grand Total */}
                    <tr className="bg-indigo-50/70 border-t-2 border-indigo-200 font-black text-slate-900 text-xs">
                      <td className="p-3.5 text-center border-r border-indigo-100 font-mono">
                        —
                      </td>
                      <td className="p-3.5 uppercase tracking-wider font-extrabold text-indigo-950 border-r border-indigo-100">
                        Grand Total
                      </td>
                      <td className="p-3.5 text-center border-r border-indigo-100 font-bold">
                        {annualTotals.carriedForward}
                      </td>
                      <td className="p-3.5 text-center text-blue-800 border-r border-indigo-100 font-bold">
                        {annualTotals.received}
                      </td>
                      <td className="p-3.5 text-center text-emerald-800 border-r border-indigo-100 font-bold">
                        {annualTotals.resolved}
                      </td>
                      <td className="p-3.5 text-center text-slate-900 font-bold">
                        {annualTotals.pending}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Statutory Footnotes / Regulatory Notes - VERBATIM FROM SEBI CIRCULAR */}
      <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200/80 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-900">
            SEBI Annexure-26 Statutory Footnotes &amp; Explanatory Notes
          </h4>
        </div>
        <div className="grid gap-2 text-xs text-amber-900/90 leading-relaxed pl-7">
          <p>
            <strong>*</strong> Should include complaints of previous months resolved in the current month, if any.
          </p>
          <p>
            <strong>**</strong> Should include total complaints pending as on the last day of the month, if any.
          </p>
          <p>
            <strong>^</strong> Average resolution time is the sum total of time taken to resolve each complaint in the current month divided by total number of complaints resolved in the current month.
          </p>
          <p>
            <strong>#</strong> Annual disposal data covers historical fiscal years and is reconciled with SEBI SCORES 2.0 portal records and statutory physical grievance registers maintained by the RTA.
          </p>
        </div>
      </div>

      {/* RTA Grievance Redressal Mechanism & Officer Contact */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold block">
                Primary Escalation (Level 1 &amp; 2)
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                RTA Grievance Officer &amp; Nodal Officer
              </h4>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              <strong>Compliance &amp; Nodal Officer:</strong> Mr. Nishant Khemani
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@trustlinkinvestor.com" className="text-indigo-600 hover:underline font-mono">
                info@trustlinkinvestor.com
              </a>
            </p>
            <p>
              <strong>Direct Phone:</strong> +91 93309 68989 / +91 98310 99404
            </p>
            <p>
              <strong>Address:</strong> Trustlink Investor Services Private Limited, Registered Office, India
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              href="/investor/grievance-redressal"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              Lodge Grievance Online
            </Link>
            <Link
              href="/track-request"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              Track Ticket Status
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold block">
                Regulatory Escalation (Level 3)
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                SEBI SCORES 2.0 &amp; SMART ODR
              </h4>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              Investors not satisfied with the resolution by the RTA may escalate their grievances directly to SEBI or initiate Online Dispute Resolution:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>SEBI SCORES 2.0:</strong> Online portal at{" "}
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-mono">
                  scores.sebi.gov.in ↗
                </a>
              </li>
              <li>
                <strong>SMART ODR Portal:</strong> Conciliation &amp; online dispute resolution at{" "}
                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-mono">
                  smartodr.in ↗
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-2 flex flex-wrap gap-2">
            <a
              href="https://scores.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              SEBI SCORES 2.0 ↗
            </a>
            <a
              href="https://smartodr.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              SMART ODR Portal ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
