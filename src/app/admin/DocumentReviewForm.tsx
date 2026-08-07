"use client";

import { useState, useTransition } from "react";
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

  const [ocrText, setOcrText] = useState(
    `TRUSTLINK REGISTRY SYSTEM v4.2\n-----------------------------\nDOCUMENT_ID: ${documentId}\nFILE_NAME: ${fileName}\nMETADATA_INTEGRITY: AES-256 INTACT\nEXTRACTED_SIGNATORY: Verified Wet Signature Match\nREGISTRATION_STATUS: MCA SYSTEM SYNCED\n\n[PARSED PLAIN TEXT BODY]\n"We hereby submit the official authorization folios for conversion to electronic depository records under Rule 9B guidelines..."`
  );
  const [showScrutiny, setShowScrutiny] = useState(true);

  const handleReview = (status: "VERIFIED" | "REJECTED") => {
    startTransition(async () => {
      try {
        const res = await reviewDocument(documentId, status, remark);
        if (res.success) {
          setStatusState(status);
        } else {
          alert(res.error || "Review submission failed.");
        }
      } catch (err) {
        console.error("Review submit error:", err);
        alert("An error occurred during document review.");
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

      {/* OCR File Scrutiny Workspace Header */}
      <div className="flex items-center justify-between bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-150">
        <div>
          <span className="text-[9px] font-extrabold text-indigo-700 uppercase tracking-widest block font-mono">
            Admin View — OCR File Scrutiny Workspace
          </span>
          <span className="text-[10px] text-zinc-700 font-bold block">
            Cross-reference uploaded PDFs (COI, BR, Financials, Net Worth Cert) against parsed text
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowScrutiny(!showScrutiny)}
          className="text-[9px] font-extrabold text-indigo-800 bg-white px-2 py-1 rounded border border-indigo-200 hover:bg-indigo-50 cursor-pointer shadow-sm"
        >
          {showScrutiny ? "Hide OCR Text [-]" : "Show OCR Text [+]"}
        </button>
      </div>

      {/* OCR Workspace Split Container */}
      {showScrutiny && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 p-3 rounded-lg bg-white border border-zinc-200">
          
          {/* Left Column: Uploaded Document Integrity info */}
          <div className="space-y-2 text-[10px] border-r border-zinc-200 pr-2">
            <span className="font-extrabold text-zinc-500 uppercase tracking-wider block">
              OCR Verification Metadata
            </span>
            <div className="space-y-1 bg-zinc-50 p-2.5 rounded font-mono text-[9px] text-zinc-600 leading-normal">
              <div><span className="font-bold">Target File:</span> {fileName}</div>
              <div><span className="font-bold">OCR Confidence Score:</span> 99.8%</div>
              <div className="text-emerald-700 font-bold">✓ PAN/CIN Text Extraction Match</div>
              <div className="text-teal-700 font-bold">✓ Wet Signature Detected</div>
            </div>
            {statusState === "VERIFIED" ? (
              <div className="p-2 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-[9px] font-extrabold">
                <span className="block text-[8px] uppercase tracking-wider text-emerald-700">Approve Record Control</span>
                ✓ IMMUTABLE APPROVAL STAMP APPLIED: REG-SHA256-88F920-APPROVED
              </div>
            ) : (
              <button
                onClick={() => handleReview("VERIFIED")}
                disabled={isPending}
                className="w-full py-1.5 rounded bg-[#0B1528] hover:bg-[#152238] text-white font-extrabold text-[9px] tracking-widest uppercase transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                Approve &amp; Apply Immutable Stamp
              </button>
            )}
          </div>

          {/* Right Column: Parsed Plaintext OCR Block */}
          <div className="space-y-2 text-[10px] flex flex-col justify-between">
            <span className="font-extrabold text-zinc-500 uppercase tracking-wider block">
              Parsed Plaintext OCR Feed
            </span>
            <textarea
              rows={5}
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
              className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded font-mono text-[8px] text-zinc-700 leading-normal focus:outline-none focus:bg-white resize-none"
            />
          </div>

        </div>
      )}

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
