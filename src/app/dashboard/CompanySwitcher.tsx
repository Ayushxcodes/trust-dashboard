"use client";

import { useRouter } from "next/navigation";

interface CompanySwitcherProps {
  currentContextId: string;
  companyMap: { id: string; name: string }[];
  activeTab: string;
}

export default function CompanySwitcher({ currentContextId, companyMap, activeTab }: CompanySwitcherProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`/dashboard?tab=${activeTab}&userContext=${value}`);
  };

  return (
    <div className="relative">
      <select
        value={currentContextId}
        onChange={handleChange}
        className="bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-xs font-extrabold text-zinc-700 focus:outline-none focus:border-[#0B1528] cursor-pointer shadow-sm"
      >
        {companyMap.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  );
}
