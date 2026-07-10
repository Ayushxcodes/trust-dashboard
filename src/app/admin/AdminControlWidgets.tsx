"use client";

import { useState, useTransition } from "react";
import { overrideCountdown, sendSystemMessageAction, deleteSystemMessageAction } from "../actions";

interface MessageData {
  id: string;
  senderId: string;
  targetUserId: string;
  messageText: string;
  type: "INFO" | "WARNING" | "CRITICAL";
  createdAt: string;
}

interface AdminControlWidgetsProps {
  userId: string;
  companyName: string;
  initialDeadline?: string;
  initialCountdownDays?: number;
  initialMessages: MessageData[];
}

export default function AdminControlWidgets({
  userId,
  companyName,
  initialDeadline = "SEPTEMBER 30, 2026",
  initialCountdownDays = 592,
  initialMessages,
}: AdminControlWidgetsProps) {
  const [prevUserId, setPrevUserId] = useState(userId);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [countdownDays, setCountdownDays] = useState(initialCountdownDays);
  const [isPendingDeadline, startTransitionDeadline] = useTransition();

  const [msgTarget, setMsgTarget] = useState<string>(userId); // Defaults to the current active client
  const [msgType, setMsgType] = useState<"INFO" | "WARNING" | "CRITICAL">("INFO");
  const [msgText, setMsgText] = useState("");
  const [isPendingMessage, startTransitionMessage] = useTransition();

  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Sync state with selected client updates
  if (userId !== prevUserId) {
    setPrevUserId(userId);
    setDeadline(initialDeadline);
    setCountdownDays(initialCountdownDays);
    setMsgTarget(userId);
    setMessages(initialMessages);
  }

  const handleUpdateDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    startTransitionDeadline(async () => {
      try {
        const res = await overrideCountdown(userId, deadline, countdownDays);
        if (res.success) {
          alert(`Successfully updated compliance target parameters for ${companyName}.`);
        } else {
          alert(res.error || "Failed to update deadline.");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while updating deadline.");
      }
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;

    startTransitionMessage(async () => {
      try {
        const res = await sendSystemMessageAction(msgTarget, msgText, msgType);
        if (res.success && res.message) {
          alert("Alert / Notification dispatched successfully.");
          setMsgText("");
          setMessages((prev) => [res.message as MessageData, ...prev]);
        } else {
          alert(res.error || "Failed to dispatch message.");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while sending message.");
      }
    });
  };

  const handleDeleteMessage = async (msgId: string) => {
    console.log("handleDeleteMessage called for msgId:", msgId);
    try {
      const res = await deleteSystemMessageAction(msgId);
      console.log("deleteSystemMessageAction response:", res);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== msgId));
        setDeletingId(null);
      } else {
        alert(res.error || "Failed to retract message.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while retracting message.");
    }
  };

  // Filter messages relevant to current scope (either broadcast or targeted to current client)
  const scopedMessages = messages.filter(
    (m) => m.targetUserId === "all" || m.targetUserId === userId
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
      {/* 1. Countdown Override Card */}
      <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-1">
            Oversight: Countdown Override Panel
          </h3>
          <p className="text-zinc-550 text-xs">
            Manually override compliance timeline indicators visible to {companyName}.
          </p>
        </div>

        <form onSubmit={handleUpdateDeadline} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Compliance Deadline Date
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="E.g., SEPTEMBER 30, 2026"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Days Remaining Countdown
              </label>
              <input
                type="number"
                value={countdownDays}
                onChange={(e) => setCountdownDays(Number(e.target.value))}
                placeholder="592"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPendingDeadline}
              className="px-4 py-2 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-bold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isPendingDeadline ? "Updating Timeline..." : "Override Countdown parameters"}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Dispatch Comments / Push Alerts Card */}
      <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-1">
            Communication: Live Dispatch Center
          </h3>
          <p className="text-zinc-550 text-xs">
            Send client-specific annotations or broadcast critical alerts across the network.
          </p>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Recipient Target Scope
              </label>
              <select
                value={msgTarget}
                onChange={(e) => setMsgTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value={userId}>Active Company ({companyName})</option>
                <option value="all">Broadcast Alert (All Entities)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Severity Priority
              </label>
              <select
                value={msgType}
                onChange={(e) => setMsgType(e.target.value as "INFO" | "WARNING" | "CRITICAL")}
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="INFO">INFO (Blue Accent)</option>
                <option value="WARNING">WARNING (Yellow Accent)</option>
                <option value="CRITICAL">CRITICAL (Red Accent)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Message Content / Direct Comment Text
            </label>
            <textarea
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Type message text here..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPendingMessage}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isPendingMessage ? "Dispatching..." : "Send Alert / Update"}
            </button>
          </div>
        </form>

        {/* List of active updates scoped to active company */}
        {scopedMessages.length > 0 && (
          <div className="border-t border-zinc-150 pt-4 space-y-2 max-h-[160px] overflow-y-auto">
            <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-widest font-mono block">
              Active Updates in Target Scope
            </span>
            <div className="space-y-1.5">
              {scopedMessages.map((msg) => {
                let pillColor = "bg-blue-50 text-blue-700";
                if (msg.type === "WARNING") pillColor = "bg-amber-50 text-amber-700";
                if (msg.type === "CRITICAL") pillColor = "bg-rose-50 text-rose-700";

                return (
                  <div key={msg.id} className="flex justify-between items-center text-[11px] p-2 bg-zinc-50 rounded-lg border border-zinc-150 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${pillColor}`}>
                        {msg.type}
                      </span>
                      <span className="font-medium text-zinc-700 truncate" title={msg.messageText}>
                        {msg.messageText}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {deletingId === msg.id ? (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteMessage(msg.id);
                            }}
                            className="text-rose-600 hover:text-rose-800 font-extrabold text-[10px] cursor-pointer px-1.5 py-0.5 bg-rose-50 border border-rose-200 rounded"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setDeletingId(null);
                            }}
                            className="text-zinc-500 hover:text-zinc-700 font-semibold text-[10px] cursor-pointer px-1"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeletingId(msg.id);
                          }}
                          className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer px-1"
                          title="Retract System Update"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
