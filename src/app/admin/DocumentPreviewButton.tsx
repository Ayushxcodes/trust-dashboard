"use client";

import { useState } from "react";
import DocumentPreviewModal from "./DocumentPreviewModal";

interface DocumentPreviewButtonProps {
  fileUrl: string;
  fileName: string;
  title: string;
  status?: string;
  adminRemark?: string;
  variant?: "button" | "icon" | "card";
}

export default function DocumentPreviewButton({
  fileUrl,
  fileName,
  title,
  status,
  adminRemark,
  variant = "button",
}: DocumentPreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {variant === "icon" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 rounded text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
          title="Preview Document"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded text-[9px] font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          PREVIEW
        </button>
      )}

      <DocumentPreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fileUrl={fileUrl}
        fileName={fileName}
        title={title}
        status={status}
        adminRemark={adminRemark}
      />
    </>
  );
}
