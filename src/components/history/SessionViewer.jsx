import React from "react";
import { ChevronRight, BookOpen, MessageSquare } from "lucide-react";
import MessageBubble from "../practice/MessageBubble";

export default function SessionViewer({ session, onBack }) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm sm:text-base">Back to History</span>
        </button>

        {/* Session Header */}
        <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 shadow-md mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-[var(--accent)]">
              {session.mode === "ai-answers" ? (
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-primary)]" />
              ) : (
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-primary)]" />
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-[var(--text-primary)]">
                {session.topic}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">
                {new Date(session.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {session.messages?.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              mode={session.mode}
              viewOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
}
