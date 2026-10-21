import React from "react";

export interface EscalationTier {
  designation: string;
  contactPerson: string;
  address: string;
  contactNo: string;
  emailId: string;
  workingHours: string;
}

export const STATUTORY_ESCALATION_MATRIX: EscalationTier[] = [
  {
    designation: "Customer Care",
    contactPerson: "Umesh Verma",
    address: "312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002",
    contactNo: "77039 70802",
    emailId: "info@trustlinkinvestor.com",
    workingHours: "10:00 am-6:00 pm",
  },
  {
    designation: "Head of Customer Care",
    contactPerson: "Beena",
    address: "312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002",
    contactNo: "97114 47994",
    emailId: "beenasharma.nka@gmail.com",
    workingHours: "10:00 am-6:00 pm",
  },
  {
    designation: "Compliance Officer",
    contactPerson: "Pooja Bansal",
    address: "312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002",
    contactNo: "95609 82564",
    emailId: "poojabansal.ssdco@gmail.com",
    workingHours: "10:00 am-6:00 pm",
  },
  {
    designation: "CEO",
    contactPerson: "Nishant Khemani",
    address: "312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002",
    contactNo: "99101 18347",
    emailId: "khemaninishant@gmail.com",
    workingHours: "10:00 am-6:00 pm",
  },
];

export default function EscalationMatrixTable({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
              SEBI Statutory Mandate
            </span>
            <span className="text-xs text-slate-500 font-mono">Master Circular Page 160</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            Escalation Matrix for Investor Services
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Prescribed format for disclosing escalation contact details under SEBI Master Circular for Registrars to an Issue and Share Transfer Agents (RTAs).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Category-I RTA Active
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
        <table className="w-full text-xs text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="bg-slate-800 text-white font-extrabold text-[11px] uppercase tracking-wider">
              <th className="p-3.5 border-r border-slate-700 w-44">Details of</th>
              <th className="p-3.5 border-r border-slate-700 min-w-[160px]">Contact Person</th>
              <th className="p-3.5 border-r border-slate-700 min-w-[220px]">Address</th>
              <th className="p-3.5 border-r border-slate-700 text-center w-36">Contact No.</th>
              <th className="p-3.5 border-r border-slate-700 min-w-[180px]">Email Id</th>
              <th className="p-3.5 text-center w-40">Working hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700 bg-white">
            {STATUTORY_ESCALATION_MATRIX.map((tier, idx) => {
              const isCEO = tier.designation === "CEO";
              const isCompliance = tier.designation === "Compliance Officer";

              return (
                <tr
                  key={tier.designation}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isCompliance
                      ? "bg-indigo-50/20"
                      : isCEO
                      ? "bg-slate-50/50"
                      : ""
                  }`}
                >
                  <td className="p-3.5 font-bold text-slate-900 border-r border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                        {idx + 1}
                      </span>
                      <span className="font-extrabold text-slate-900">{tier.designation}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 border-r border-slate-100">
                    {tier.contactPerson}
                  </td>
                  <td className="p-3.5 text-slate-600 text-[11px] leading-relaxed border-r border-slate-100">
                    {tier.address}
                  </td>
                  <td className="p-3.5 text-center font-mono font-semibold border-r border-slate-100">
                    <a
                      href={`tel:${tier.contactNo.split("/")[0].trim()}`}
                      className="text-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      {tier.contactNo}
                    </a>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] border-r border-slate-100">
                    <a
                      href={`mailto:${tier.emailId}`}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline font-bold"
                    >
                      {tier.emailId}
                    </a>
                  </td>
                  <td className="p-3.5 text-center text-[11px] text-slate-600">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200/80">
                      {tier.workingHours}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">In absence of response within regulatory TAT:</span>
          <span>You may escalate directly to Level 2 (Compliance Officer) or Level 3 (SCORES / SMARTODR).</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline font-bold"
          >
            SEBI SCORES 2.0 →
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://smartodr.in"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:underline font-bold"
          >
            SMARTODR Portal →
          </a>
        </div>
      </div>
    </div>
  );
}
