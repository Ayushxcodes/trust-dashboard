"use client";

import { useState, useRef, useTransition } from "react";
import { toast } from "sonner";
import { editTemplate } from "../actions";

interface TemplateData {
  id: string;
  title: string;
  description: string;
  requiredFor: string;
  fileUrl: string;
}

interface EditTemplateModalProps {
  template: TemplateData;
  onClose: () => void;
}

export default function EditTemplateModal({ template, onClose }: EditTemplateModalProps) {
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description);
  const [requiredFor, setRequiredFor] = useState(template.requiredFor);
  const [fileUrl, setFileUrl] = useState(template.fileUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", template.id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("requiredFor", requiredFor);
        formData.append("fileUrl", fileUrl);
        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        const res = await editTemplate(formData);
        if (res.success) {
          toast.success("Document template updated successfully!");
          onClose();
        } else {
          toast.error(res.error || "Failed to update template.");
        }
      } catch (err) {
        console.error("Edit template error:", err);
        toast.error("An error occurred during template update.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-150 pb-3">
          <div>
            <h3 className="text-base font-bold text-zinc-900">Edit Document Template</h3>
            <p className="text-xs text-zinc-550">Modify template metadata, section placement, or replacement file URL.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Edit Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Template Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Board Resolution"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Compliance Section / Phase
              </label>
              <input
                type="text"
                required
                value={requiredFor}
                onChange={(e) => setRequiredFor(e.target.value)}
                placeholder="E.g., Vault → Phase 2: Professional Authorizations"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
              Description & Instructions
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instructions for signatories, execution details..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                Upload Replacement File
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600
                  file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0
                  file:text-[10px] file:font-semibold file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
                File URL / Path
              </label>
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="/templates/board_resolution_format.docx"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-150">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {isPending ? "Saving Changes..." : "Save Template Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
