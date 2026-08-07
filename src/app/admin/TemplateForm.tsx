"use client";

import { useState, useRef, useTransition } from "react";
import { toast } from "sonner";
import { addTemplate } from "../actions";

export default function TemplateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredFor, setRequiredFor] = useState("Account Setup");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("requiredFor", requiredFor);
        formData.append("fileUrl", fileUrl || "/templates/custom_placeholder.docx");
        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        const res = await addTemplate(formData);
        if (res.success) {
          toast.success("Document template created successfully!");
          setTitle("");
          setDescription("");
          setRequiredFor("Account Setup");
          setFileUrl("");
          setSelectedFile(null);
          formRef.current?.reset();
        } else {
          toast.error(res.error || "Failed to create template.");
        }
      } catch (err) {
        console.error("Create template error:", err);
        toast.error("An error occurred during template creation.");
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-zinc-900 mb-1">Create Document Template</h3>
        <p className="text-zinc-500 text-xs">
          Publish a new empty document template that client organizations must download and complete.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Template Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Proof of Address Declaration"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Compliance Section
          </label>
          <select
            value={requiredFor}
            onChange={(e) => setRequiredFor(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="Account Setup">Account Setup</option>
            <option value="Identity Verification">Identity Verification</option>
            <option value="Compliance">Compliance</option>
            <option value="Legal Processing">Legal Processing</option>
            <option value="Other Verification">Other Verification</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          Description
        </label>
        <textarea
          rows={2}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the document instructions, required signatories, and format details..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Upload Template File
          </label>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-550
              file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0
              file:text-[10px] file:font-semibold file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Or enter fallback download File URL
          </label>
          <input
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="Defaults to /templates/custom_placeholder.docx"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-650/20"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Template
            </>
          )}
        </button>
      </div>
    </form>
  );
}
