"use client";

import { useRef, useTransition } from "react";
import { uploadDocument } from "../actions";

interface UploadButtonProps {
  templateId: string;
  templateTitle: string;
}

export default function UploadButton({ templateId, templateTitle }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      try {
        const res = await uploadDocument(templateId, file.name);
        if (res.success) {
          // File uploaded successfully, state revalidation is handled by server action
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          alert(res.error || "Failed to upload document");
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("An error occurred during document upload.");
      }
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
      />
      <button
        onClick={triggerFileInput}
        disabled={isPending}
        className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs border border-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-3.5 w-3.5 text-indigo-650" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload File
          </>
        )}
      </button>
    </div>
  );
}
