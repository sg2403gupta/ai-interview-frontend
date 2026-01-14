import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  History,
  Trash2,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function HistoryView({ onBack, onSelectSession }) {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setSessions(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      await api.deleteSession(sessionId);
      setSessions(sessions.filter((s) => s._id !== sessionId));
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm sm:text-base">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-[var(--text-primary)]">
            Practice History
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-primary)]/70">
            Review your previous practice sessions
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[var(--accent)] border-t-[var(--text-primary)] rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--text-primary)]/70">Loading history...</p>
          </div>
        ) : sessions.length === 0 ? (
          /* Empty State */
          <div className="bg-[var(--bg-surface)] rounded-2xl p-8 sm:p-12 text-center">
            <History className="w-14 h-14 sm:w-16 sm:h-16 text-[var(--accent)] mx-auto mb-4" />
            <p className="text-lg sm:text-xl text-[var(--text-primary)]">
              No practice sessions yet
            </p>
            <p className="text-sm sm:text-base text-[var(--text-primary)]/70 mt-2">
              Start practicing to build your history!
            </p>
          </div>
        ) : (
          /* Session List */
          <div className="grid grid-cols-1 gap-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                onClick={() => onSelectSession(session)}
                className="bg-[var(--bg-surface)] rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--accent)]">
                        {session.mode === "ai-answers" ? (
                          <BookOpen className="w-5 h-5 text-[var(--text-primary)]" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-[var(--text-primary)]" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                          {session.topic}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--text-primary)]/70">
                          {session.mode === "ai-answers"
                            ? "Asked Questions"
                            : "Practiced Answering"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[var(--text-primary)]/70">
                      <span>{session.messages?.length || 0} messages</span>
                      <span>•</span>
                      <span>
                        {new Date(session.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => deleteSession(session._id, e)}
                      className="p-2 rounded-lg border border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--accent)]/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <ChevronRight className="w-5 h-5 text-[var(--text-primary)]/50 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
