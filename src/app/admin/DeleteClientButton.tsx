"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteClientAccount } from "../actions";

interface DeleteClientButtonProps {
  userId: string;
  clientName: string;
  variant?: "table" | "icon" | "full";
}

export default function DeleteClientButton({
  userId,
  clientName,
  variant = "table",
}: DeleteClientButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteClientAccount(userId);
        if (res.success) {
          toast.success(`Client '${clientName}' deleted successfully.`);
        } else {
          toast.error(res.error || "Failed to delete client account.");
          setShowConfirm(false);
        }
      } catch (err) {
        console.error("Delete client error:", err);
        toast.error("An error occurred while deleting the client.");
        setShowConfirm(false);
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-1.5 shrink-0 animate-in fade-in slide-in-from-right-1 duration-150 justify-end">
        <span className="text-[10px] text-rose-600 font-bold hidden sm:inline">Delete?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-2 py-1 text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.97] rounded transition-all cursor-pointer disabled:opacity-50 shadow-sm"
        >
          {isPending ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="px-2 py-1 text-[10px] font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.97] rounded transition-all cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
        title={`Delete ${clientName}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold rounded transition-colors flex items-center gap-1 cursor-pointer"
      title={`Delete ${clientName}`}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete Client
    </button>
  );
}
