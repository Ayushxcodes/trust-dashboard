"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateEntityModal from "./CreateEntityModal";

interface CompanySwitcherProps {
  currentContextId: string;
  companyMap: { id: string; name: string }[];
  activeTab: string;
}

export default function CompanySwitcher({ currentContextId, companyMap, activeTab }: CompanySwitcherProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "__NEW_CLIENT__") {
      setIsModalOpen(true);
    } else {
      router.push(`/dashboard?tab=${activeTab}&userContext=${value}`);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
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
        <option value="__NEW_CLIENT__" className="font-bold text-indigo-600">
          + Step 03: Create New Client Entity...
        </option>
      </select>

      <CreateEntityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
