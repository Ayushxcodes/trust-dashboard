"use client";

import { useState, useTransition } from "react";
import { updatePipeline } from "../actions";

interface PipelineStageData {
  id: string;
  stageName: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  stageOrder: number;
  adminNote: string;
}

interface PipelineFormProps {
  userId: string;
  stages: PipelineStageData[];
}

export default function PipelineForm({ userId, stages }: PipelineFormProps) {
  const [prevUserId, setPrevUserId] = useState(userId);

  const activeStage = stages.find((s) => s.status === "IN_PROGRESS") || stages.find((s) => s.status === "PENDING") || stages[0];

  const [selectedOrder, setSelectedOrder] = useState<number>(activeStage?.stageOrder ?? 1);
  const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED">(activeStage?.status ?? "IN_PROGRESS");
  const [note, setNote] = useState(activeStage?.adminNote || "");
  const [isPending, startTransition] = useTransition();

  if (userId !== prevUserId) {
    setPrevUserId(userId);
    if (activeStage) {
      setSelectedOrder(activeStage.stageOrder);
      setStatus(activeStage.status);
      setNote(activeStage.adminNote || "");
    }
  }

  // When a stage is clicked, load its information
  const handleStageSelect = (order: number) => {
    setSelectedOrder(order);
    const stage = stages.find((s) => s.stageOrder === order);
    if (stage) {
      setStatus(stage.status);
      setNote(stage.adminNote || "");
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await updatePipeline(userId, selectedOrder, status, note);
        if (!res.success) {
          alert(res.error || "Failed to update pipeline stage.");
        }
      } catch (err) {
        console.error("Pipeline update error:", err);
        alert("An error occurred during pipeline update.");
      }
    });
  };

  return (
    <form onSubmit={handleUpdate} className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-bold text-zinc-900 mb-1">Update Compliance Pipeline</h3>
        <p className="text-zinc-550 text-xs">
          Select a milestone stage below to set its current state and publish administrative instructions.
        </p>
      </div>

      {/* Stage Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {stages.map((stage) => {
          const isSelected = selectedOrder === stage.stageOrder;
          
          let stateColor = "border-zinc-200 bg-zinc-50/50 text-zinc-500";
          if (stage.status === "COMPLETED") {
            stateColor = "border-emerald-250 bg-emerald-50 text-emerald-600";
          } else if (stage.status === "IN_PROGRESS") {
            stateColor = "border-indigo-250 bg-indigo-50 text-indigo-650";
          }

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStageSelect(stage.stageOrder)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${stateColor} ${
                isSelected ? "ring-2 ring-indigo-600 border-transparent scale-105" : "hover:border-zinc-400"
              }`}
            >
              <span className="text-[10px] font-mono leading-none font-bold">Stage {stage.stageOrder}</span>
              <span className="text-[10px] font-bold truncate max-w-full block leading-tight">
                {stage.stageName}
              </span>
              <span className="text-[8px] uppercase font-mono block font-bold opacity-80 mt-0.5">
                {stage.status === "IN_PROGRESS" ? "Active" : stage.status.toLowerCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status & Remark editor for selected stage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-xl bg-zinc-50 border border-zinc-200">
        <div>
          <label className="block text-xs font-semibold text-zinc-650 uppercase tracking-wider mb-2">
            Selected Stage Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "PENDING" | "IN_PROGRESS" | "COMPLETED")}
            className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="PENDING">PENDING (Not Started)</option>
            <option value="IN_PROGRESS">IN_PROGRESS (Active)</option>
            <option value="COMPLETED">COMPLETED (Approved)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-zinc-650 uppercase tracking-wider mb-2">
            Administrative Milestone Notes
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Awaiting template uploads or verification complete..."
            className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg hover:shadow-indigo-650/20"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Updating...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Update Pipeline State
            </>
          )}
        </button>
      </div>
    </form>
  );
}
