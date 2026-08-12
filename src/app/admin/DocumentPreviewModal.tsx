"use client";

import { useEffect, useState } from "react";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  title: string;
  status?: string;
  adminRemark?: string;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  title,
  status,
  adminRemark,
}: DocumentPreviewModalProps) {
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext) || fileUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i);
  const isPdf = ext === "pdf" || fileUrl.includes(".pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0B1528] text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F1C33]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white truncate">{title}</h3>
                {status && (
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase font-mono tracking-wider border ${
                    status === "VERIFIED"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : status === "REJECTED"
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  }`}>
                    {status}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-mono block truncate max-w-md">
                {fileName}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {isImage && (
              <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-xs text-slate-300">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
                  className="px-2 py-1 hover:bg-slate-700 rounded transition-colors"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="px-2 font-mono text-[11px]">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(200, z + 25))}
                  className="px-2 py-1 hover:bg-slate-700 rounded transition-colors"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            )}

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Tab
            </a>

            <a
              href={fileUrl}
              download={fileName}
              className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-2"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-slate-950/60 min-h-[450px]">
          {isImage ? (
            <div className="overflow-auto max-h-[70vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fileUrl}
                alt={fileName}
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
                className="max-w-full max-h-[65vh] object-contain rounded-lg border border-slate-800 shadow-xl transition-transform duration-150"
              />
            </div>
          ) : isPdf ? (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-[70vh] rounded-lg border border-slate-800 bg-white"
            >
              <iframe
                src={fileUrl}
                title={fileName}
                className="w-full h-[70vh] rounded-lg border border-slate-800 bg-white"
                referrerPolicy="no-referrer"
              />
            </object>
          ) : (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-slate-900/90 rounded-xl border border-slate-800 p-8 text-center">
              <iframe
                src={fileUrl}
                className="w-full h-full rounded-lg border border-slate-800 bg-white mb-4"
                title={fileName}
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">If the document preview does not load directly in frame:</span>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-teal-500 text-slate-950 text-xs font-bold rounded hover:bg-teal-400 transition-colors"
                >
                  Open Document Viewer
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        {adminRemark && (
          <div className="px-6 py-3 border-t border-slate-800 bg-[#0F1C33] flex items-center gap-2 text-xs">
            <span className="font-bold text-amber-400 font-mono text-[10px] uppercase">Admin Remark:</span>
            <span className="text-slate-300 italic">{adminRemark}</span>
          </div>
        )}

      </div>
    </div>
  );
}
