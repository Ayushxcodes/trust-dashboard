"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { uploadDocument } from "../actions";

interface UploadButtonProps {
  templateId: string;
  templateTitle: string;
  activeUserId: string;
  existingDoc?: {
    id: string;
    fileName: string;
    status: string;
    uploadedFileUrl?: string;
  };
}

export default function UploadButton({
  templateId,
  templateTitle,
  activeUserId,
  existingDoc,
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleUpload = (file: File) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("templateId", templateId);
        formData.append("activeUserId", activeUserId);
        formData.append("file", file);

        const res = await uploadDocument(formData);
        if (res.success) {
          toast.success("Document uploaded successfully!", {
            description: `${file.name} attached to ${templateTitle}`,
          });
        } else {
          toast.error(res.error || "Failed to upload document");
        }
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("An error occurred during document upload.");
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
      />

      {existingDoc ? (
        <div className="flex items-center gap-2">
          {/* Uploaded indicator card with green tick */}
          <div className="px-3 py-2 rounded-lg border border-emerald-250 bg-emerald-50/70 flex items-center gap-2 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">
              ✓
            </span>
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider block font-mono">
                {existingDoc.status === "VERIFIED"
                  ? "✓ Verified"
                  : existingDoc.status === "REJECTED"
                  ? "✕ Rejected"
                  : "✓ Document Uploaded"}
              </span>
              <span className="text-[10px] text-zinc-700 font-bold block truncate max-w-[140px]" title={existingDoc.fileName}>
                {existingDoc.fileName}
              </span>
            </div>
          </div>

          {/* Re-upload / replace button */}
          <button
            onClick={triggerFileInput}
            disabled={isPending}
            className="px-2.5 py-2 rounded-lg border border-zinc-250 bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-[9px] transition-all flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
            title="Replace uploaded document"
          >
            {isPending ? (
              <span className="animate-pulse">Uploading...</span>
            ) : (
              <>
                <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Replace
              </>
            )}
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border rounded-lg transition-all p-2.5 flex flex-col items-center justify-center text-center cursor-pointer min-w-[170px] ${
            isDragOver
              ? "border-emerald-500 bg-emerald-50/50 scale-[1.02]"
              : "border-dashed border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50"
          }`}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center gap-1">
            {isPending ? (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                <svg className="animate-spin h-3.5 w-3.5 text-zinc-550" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </div>
            ) : (
              <>
                <svg
                  className={`w-5 h-5 transition-colors ${isDragOver ? "text-emerald-600" : "text-zinc-450"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-[10px] font-bold text-zinc-700">
                  {isDragOver ? "Drop to Upload" : "Click / Drag File Here"}
                </span>
                <span className="text-[8px] text-zinc-400 font-mono">
                  PDF, DOCX up to 10MB
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
