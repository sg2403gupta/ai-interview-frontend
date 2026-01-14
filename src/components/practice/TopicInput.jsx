import React from "react";
import { ChevronRight, BookOpen, MessageSquare } from "lucide-react";

export default function TopicInput({ mode, topic, setTopic, onStart, onBack }) {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)] flex items-center justify-center px-4 py-8">
      <div className="bg-[var(--bg-surface)] rounded-2xl p-6 sm:p-8 shadow-lg max-w-2xl w-full">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition mb-6"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm sm:text-base">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--accent)] rounded-2xl flex items-center justify-center mx-auto mb-4">
            {mode === "ai-answers" ? (
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--text-primary)]" />
            ) : (
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--text-primary)]" />
            )}
          </div>

          <h2 className="text-xl sm:text-3xl font-bold mb-2 text-[var(--text-primary)]">
            {mode === "ai-answers" ? "Ask AI Questions" : "Practice Answering"}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-primary)]/70 max-w-md mx-auto">
            {mode === "ai-answers"
              ? "Choose a topic and ask interview questions to get clear, structured AI answers."
              : "Choose a topic and practice answering AI-generated interview questions."}
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
              What topic do you want to practice?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onStart()}
              className="w-full px-4 py-3 rounded-lg border border-[var(--accent)] bg-[#FFF8E8] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              placeholder="e.g., React Hooks, System Design, JavaScript..."
              autoFocus
            />
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            disabled={!topic.trim()}
            className="w-full bg-[var(--text-primary)] text-[#FFF8E8] py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Start Practice</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
