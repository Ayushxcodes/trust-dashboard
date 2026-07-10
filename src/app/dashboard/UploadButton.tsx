"use client";

import { useRef, useState, useTransition } from "react";
import { uploadDocument } from "../actions";

interface UploadButtonProps {
  templateId: string;
  templateTitle: string;
  activeUserId: string;
}

export default function UploadButton({ templateId, templateTitle, activeUserId }: UploadButtonProps) {
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
        if (!res.success) {
          alert(res.error || "Failed to upload document");
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("An error occurred during document upload.");
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
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border rounded-lg transition-all p-2.5 flex flex-col items-center justify-center text-center cursor-pointer ${
        isDragOver
          ? "border-emerald-500 bg-emerald-50/50 scale-[1.02]"
          : "border-dashed border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 hover:bg-zinc-50"
      }`}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
      />
      
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
  );
}
