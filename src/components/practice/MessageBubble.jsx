import React from "react";
import { Edit3, Check, X } from "lucide-react";

export default function MessageBubble({
  message,
  mode,
  onModify,
  isModifying,
  modifyInstruction,
  setModifyInstruction,
  handleModify,
  loading,
  viewOnly = false,
}) {
  const isUser =
    message.type === "user-question" || message.type === "user-answer";
  const isAI =
    message.type === "ai-answer" ||
    message.type === "ai-question" ||
    message.type === "ai-feedback";
  const isSystem = message.type === "system";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[90%] sm:max-w-[80%] md:max-w-[70%]
          rounded-2xl px-4 py-3 shadow-sm
          ${
            isUser
              ? "bg-[#FFF8E8] border border-[var(--accent)]"
              : isAI
              ? "bg-[var(--bg-surface)] border border-[var(--accent)]"
              : "bg-[var(--bg-surface)] border border-dashed border-[var(--accent)]"
          }
        `}
      >
        {/* Message Content */}
        <p className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {message.content}
        </p>

        {/* Score (for feedback mode) */}
        {message.type === "ai-feedback" &&
          typeof message.score !== "undefined" && (
            <div className="mt-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
              Score: <span className="opacity-80">{message.score}/10</span>
            </div>
          )}

        {/* Modify Answer Feature */}
        {!viewOnly &&
          message.type === "ai-answer" &&
          message.messageId &&
          !isModifying && (
            <button
              onClick={() => onModify(message.messageId)}
              className="mt-2 inline-flex items-center space-x-1 text-xs sm:text-sm text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition"
            >
              <Edit3 className="w-4 h-4" />
              <span>Improve answer</span>
            </button>
          )}

        {/* Modify Input */}
        {!viewOnly && isModifying && (
          <div className="mt-3 space-y-2">
            <textarea
              rows={2}
              value={modifyInstruction}
              onChange={(e) => setModifyInstruction(e.target.value)}
              placeholder="How should I improve this answer?"
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleModify(message.messageId)}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1.5 bg-[var(--text-primary)] text-[#FFF8E8] rounded-lg text-sm hover:opacity-90 transition disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Apply</span>
              </button>

              <button
                onClick={() => setModifyInstruction("")}
                className="flex items-center space-x-1 px-3 py-1.5 border border-[var(--accent)] text-[var(--text-primary)] rounded-lg text-sm hover:bg-[var(--accent)]/20 transition"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Timestamp */}
        {message.timestamp && (
          <div className="mt-2 text-[10px] sm:text-xs text-[var(--text-primary)]/60 text-right">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
