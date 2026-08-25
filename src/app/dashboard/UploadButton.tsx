"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { uploadDocument, getDirectUploadPresignedUrl, saveDirectUploadedDocumentRecord } from "../actions";

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
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds the 50MB limit. Please upload a smaller file.");
      return;
    }
    startTransition(async () => {
      try {
        // Step 1: Attempt to get direct S3 presigned upload URL (bypasses Server Action 6MB payload limit on AWS API Gateway)
        const presignedRes = await getDirectUploadPresignedUrl(
          templateId,
          file.name,
          file.type,
          activeUserId
        );

        if (presignedRes.success && presignedRes.uploadUrl && presignedRes.s3Url) {
          try {
            // Upload directly from browser to AWS S3 bucket
            const s3UploadRes = await fetch(presignedRes.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": file.type || "application/octet-stream",
              },
              body: file,
            });

            if (s3UploadRes.ok) {
              // Record document entry in database
              const recordRes = await saveDirectUploadedDocumentRecord(
                templateId,
                file.name,
                presignedRes.s3Url,
                activeUserId
              );

              if (recordRes.success) {
                toast.success("Document uploaded successfully!", {
                  description: `${file.name} attached to ${templateTitle}`,
                });
                return;
              } else {
                toast.error(recordRes.error || "Failed to record document upload");
                return;
              }
            } else {
              console.warn("Direct S3 upload HTTP status:", s3UploadRes.status, "Falling back to server action.");
            }
          } catch (s3FetchErr) {
            console.warn("Direct S3 fetch error (S3 CORS or network issue):", s3FetchErr, "Falling back to server action.");
          }
        }

        // Fallback: If direct S3 upload fails or S3 is not configured, use standard Server Action upload
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
          {/* Uploaded colorful badge displaying document details */}
          <div className={`px-3 py-2 rounded-lg border flex items-center gap-2 shadow-sm font-sans ${
            existingDoc.status === "VERIFIED"
              ? "border-purple-300 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-50 text-purple-950"
              : existingDoc.status === "REJECTED"
              ? "border-rose-300 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-950"
              : "border-emerald-300 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-950"
          }`}>
            <svg className={`w-4 h-4 shrink-0 ${
              existingDoc.status === "VERIFIED" ? "text-purple-700" : existingDoc.status === "REJECTED" ? "text-rose-700" : "text-emerald-700"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="min-w-0">
              <span className={`text-[9px] font-extrabold uppercase tracking-wider block font-mono ${
                existingDoc.status === "VERIFIED" ? "text-purple-800" : existingDoc.status === "REJECTED" ? "text-rose-800" : "text-emerald-800"
              }`}>
                {existingDoc.status === "VERIFIED"
                  ? "✓ Approved by Admin"
                  : existingDoc.status === "REJECTED"
                  ? "✕ Rejected by Admin"
                  : "✓ Document Attached"}
              </span>
              <span className={`text-[11px] font-bold block truncate max-w-[150px] ${
                existingDoc.status === "VERIFIED" ? "text-purple-950" : existingDoc.status === "REJECTED" ? "text-rose-950" : "text-emerald-950"
              }`} title={existingDoc.fileName}>
                {existingDoc.fileName}
              </span>
            </div>
          </div>

          {/* Re-upload / replace file button — Hidden once Approved by Admin */}
          {existingDoc.status !== "VERIFIED" && (
            <button
              onClick={triggerFileInput}
              disabled={isPending}
              className={`px-3 py-2 rounded-lg border font-extrabold text-[10px] transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm ${
                existingDoc.status === "REJECTED"
                  ? "border-rose-300 bg-white hover:bg-rose-50 text-rose-800"
                  : "border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800"
              }`}
              title="Replace uploaded document with a new file"
            >
              {isPending ? (
                <span className="animate-pulse">Uploading...</span>
              ) : (
                <>
                  <svg className={`w-3.5 h-3.5 ${
                    existingDoc.status === "REJECTED" ? "text-rose-700" : "text-emerald-700"
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Replace
                </>
              )}
            </button>
          )}
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
