"use client";

import { useState } from "react";
import DeleteTemplateButton from "./DeleteTemplateButton";
import EditTemplateModal from "./EditTemplateModal";
import DocumentPreviewButton from "./DocumentPreviewButton";

interface TemplateData {
  id: string;
  title: string;
  description: string;
  requiredFor: string;
  fileUrl: string;
}

export default function AdminTemplateActions({ template }: { template: TemplateData }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        {template.fileUrl && template.fileUrl !== "#" && (
          <>
            <DocumentPreviewButton
              fileUrl={template.fileUrl}
              fileName={template.fileUrl.split("/").pop() || template.title}
              title={`Template Format: ${template.title}`}
              variant="button"
            />
            <a
              href={template.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-indigo-650 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              title="Download Template File"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-indigo-650 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          title="Edit Template"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        <DeleteTemplateButton templateId={template.id} />
      </div>

      {isEditing && (
        <EditTemplateModal
          template={template}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
