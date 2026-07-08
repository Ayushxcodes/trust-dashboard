"use client";

import { useTransition } from "react";
import { removeTemplate } from "../actions";

interface DeleteTemplateButtonProps {
  templateId: string;
}

export default function DeleteTemplateButton({ templateId }: DeleteTemplateButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this template? Any historical documents linked to this template may still be visible in the history.")) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await removeTemplate(templateId);
        if (!res.success) {
          alert(res.error || "Failed to delete template.");
        }
      } catch (err) {
        console.error("Delete template error:", err);
        alert("An error occurred while deleting the template.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-450 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
      title="Delete Template"
    >
      {isPending ? (
        <svg className="animate-spin h-3.5 w-3.5 text-rose-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}
