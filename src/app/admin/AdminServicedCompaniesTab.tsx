"use client";

import { useState } from "react";
import { addServicedCompanyAction, deleteServicedCompanyAction } from "@/app/actions";
import { ServicedCompanyRecord, User } from "@/lib/db";

interface AdminServicedCompaniesTabProps {
  initialCompanies: ServicedCompanyRecord[];
  clients: User[];
}

export default function AdminServicedCompaniesTab({
  initialCompanies,
  clients,
}: AdminServicedCompaniesTabProps) {
  const [companies, setCompanies] = useState<ServicedCompanyRecord[]>(initialCompanies);
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    isin: "",
    type: "Unlisted Public Equity",
    status: "Active servicing",
    nodalContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [search, setSearch] = useState("");

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    if (!clientId) return;

    const found = clients.find((c) => c.id === clientId);
    if (found) {
      setFormData({
        name: found.companyName || found.name,
        cin: found.corporateId || "",
        isin: "INE" + Math.floor(100000 + Math.random() * 900000).toString() + "0101",
        type: "Unlisted Public Equity",
        status: "Active servicing",
        nodalContact: found.email || "secretarial@trustlinkinvestor.com",
      });
    }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage({ type: "error", text: "Please enter or select a company name." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const res = await addServicedCompanyAction(formData);
    setIsSubmitting(false);

    if (res.success && res.company) {
      setCompanies((prev) => [res.company!, ...prev]);
      setMessage({ type: "success", text: `${res.company.name} added to public ISIN directory!` });
      setFormData({
        name: "",
        cin: "",
        isin: "",
        type: "Unlisted Public Equity",
        status: "Active servicing",
        nodalContact: "",
      });
      setSelectedClientId("");
    } else {
      setMessage({ type: "error", text: res.error || "Failed to add company." });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the public directory?`)) return;

    setDeletingId(id);
    const res = await deleteServicedCompanyAction(id);
    setDeletingId(null);

    if (res.success) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert(res.error || "Failed to remove company.");
    }
  };

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.isin.toLowerCase().includes(search.toLowerCase()) ||
      c.cin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Add Company Form */}
      <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-6">
        <div className="border-b border-zinc-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            Publish New Issuer to Serviced Companies &amp; ISIN Directory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an onboarded client from the dropdown or enter custom company details to display on the public directory.
          </p>
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

        <form onSubmit={handleAddCompany} className="space-y-4">
          {/* Quick Select Client Dropdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              ⚡ Quick Select Onboarded Client Entity (Dropdown):
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => handleSelectClient(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-slate-400 outline-none"
            >
              <option value="">-- Select Onboarded Client (Autofills Details) --</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName} ({client.name} - {client.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company / Issuer Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Acme FinCorp Limited"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs focus:ring-2 focus:ring-slate-400 outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CIN (Corporate Identification Number)
              </label>
              <input
                type="text"
                value={formData.cin}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                placeholder="e.g. U74999DL2015PLC284910"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs font-mono focus:ring-2 focus:ring-slate-400 outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                ISIN Code (NSDL / CDSL)
              </label>
              <input
                type="text"
                value={formData.isin}
                onChange={(e) => setFormData({ ...formData, isin: e.target.value })}
                placeholder="e.g. INE001A01018"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs font-mono focus:ring-2 focus:ring-slate-400 outline-none uppercase font-bold text-blue-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Security Category
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs font-semibold bg-white focus:ring-2 focus:ring-slate-400 outline-none"
              >
                <option value="Unlisted Public Equity">Unlisted Public Equity</option>
                <option value="Listed Equity">Listed Equity</option>
                <option value="Debt / Bonds">Debt / Bonds</option>
                <option value="Preference Shares">Preference Shares</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Depository Servicing Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs font-semibold bg-white focus:ring-2 focus:ring-slate-400 outline-none"
              >
                <option value="Active servicing">Active servicing</option>
                <option value="ISIN Activated">ISIN Activated</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Secretarial / Nodal Contact Email
              </label>
              <input
                type="email"
                value={formData.nodalContact}
                onChange={(e) => setFormData({ ...formData, nodalContact: e.target.value })}
                placeholder="secretarial@company.com"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs focus:ring-2 focus:ring-slate-400 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
            >
              {isSubmitting ? "Publishing..." : "+ Add & Publish to ISIN Directory"}
            </button>
          </div>
        </form>
      </div>

      {/* Directory Records Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Directory Issuer Entries ({companies.length})
            </h3>
            <p className="text-xs text-slate-500">Live serviced companies visible on public `/companies` page.</p>
          </div>

          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search directory entries..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 font-semibold"
            />
            <svg
              className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Company / Issuer</th>
                  <th className="p-4">ISIN &amp; CIN</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Nodal Email</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredCompanies.map((comp) => (
                  <tr key={comp.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900">{comp.name}</td>
                    <td className="p-4 font-mono">
                      <div className="font-bold text-blue-700">{comp.isin}</div>
                      <div className="text-[10px] text-slate-500">{comp.cin}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{comp.type}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        {comp.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 text-[11px]">{comp.nodalContact}</td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        type="button"
                        disabled={deletingId === comp.id}
                        onClick={() => handleDelete(comp.id, comp.name)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] border border-rose-200 transition-colors cursor-pointer"
                      >
                        {deletingId === comp.id ? "Removing..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCompanies.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-zinc-400 text-xs font-semibold">
                      No serviced companies in directory yet. Select a client from the dropdown above to publish one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
