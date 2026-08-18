"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { reviewDocument } from "../actions";

interface DocumentReviewFormProps {
  documentId: string;
  fileName: string;
  currentStatus: string;
  adminRemark: string;
}

export default function DocumentReviewForm({
  documentId,
  fileName,
  currentStatus,
  adminRemark,
}: DocumentReviewFormProps) {
  const [prevDocumentId, setPrevDocumentId] = useState(documentId);
  const [statusState, setStatusState] = useState(currentStatus);
  const [remark, setRemark] = useState(adminRemark || "");
  const [isPending, startTransition] = useTransition();

  if (documentId !== prevDocumentId) {
    setPrevDocumentId(documentId);
    setStatusState(currentStatus);
    setRemark(adminRemark || "");
  }

  const handleReview = (status: "VERIFIED" | "REJECTED") => {
    startTransition(async () => {
      try {
        const res = await reviewDocument(documentId, status, remark);
        if (res.success) {
          setStatusState(status);
          if (status === "VERIFIED") {
            toast.success("Document Verified & Stamped!", {
              description: `Immutable approval stamp applied to ${fileName}`,
            });
          } else {
            toast.error("Document Rejected", {
              description: `${fileName} has been marked as rejected.`,
            });
          }
        } else {
          toast.error(res.error || "Review submission failed.");
        }
      } catch (err) {
        console.error("Review submit error:", err);
        toast.error("An error occurred during document review.");
      }
    });
  };

  return (
    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4 shadow-sm">
      
      {/* Header Info */}
      <div className="flex justify-between items-start gap-2 border-b border-zinc-200 pb-2.5">
        <div className="min-w-0">
          <span className="block text-[9px] font-extrabold text-zinc-450 uppercase tracking-widest">
            File Submitted
          </span>
          <span className="text-xs text-zinc-800 font-extrabold block truncate max-w-[220px]" title={fileName}>
            {fileName}
          </span>
        </div>
        <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
          statusState === "VERIFIED"
            ? "bg-emerald-50 border-emerald-250 text-emerald-700"
            : statusState === "REJECTED"
            ? "bg-rose-50 border-rose-250 text-rose-700"
            : "bg-amber-50 border-amber-250 text-amber-700"
        }`}>
          {statusState === "UPLOADED" ? "PENDING REVIEW" : statusState}
        </span>
      </div>

      {/* Review Remarks */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
          Reviewer Remark / Rejection Reason
        </label>
        <textarea
          rows={2}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter audit logs notes or reason for rejection here..."
          className="w-full px-3 py-2 rounded border border-zinc-250 bg-white text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
        />
      </div>

      {/* Standard Actions */}
      <div className="flex gap-2.5 pt-2">
        <button
          onClick={() => handleReview("VERIFIED")}
          disabled={isPending || statusState === "VERIFIED"}
          className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-extrabold text-xs transition-colors shadow disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
        >
          {statusState === "VERIFIED" ? "✓ Immutable Approval Stamp Applied" : (isPending ? "Stamping..." : "Approve & Stamp Record")}
        </button>
        <button
          onClick={() => handleReview("REJECTED")}
          disabled={isPending}
          className="flex-1 py-2 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer shadow disabled:opacity-50"
        >
          {isPending ? "Stamping..." : "Reject"}
        </button>
      </div>

    </div>
  );
}
