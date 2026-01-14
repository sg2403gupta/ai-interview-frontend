import React, { useState } from "react";
import { MessageSquare, Target, Clock, BookOpen, History } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import PracticeModeCard from "./PracticeModeCard";
import PracticeSession from "../practice/PracticeSession";
import HistoryView from "../history/HistoryView";
import SessionViewer from "../history/SessionViewer";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [view, setView] = useState("home");
  const [practiceMode, setPracticeMode] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  if (view === "practice" && practiceMode) {
    return (
      <PracticeSession mode={practiceMode} onBack={() => setView("home")} />
    );
  }

  if (view === "history") {
    return (
      <HistoryView
        onBack={() => setView("home")}
        onSelectSession={(session) => {
          setSelectedSession(session);
          setView("view-session");
        }}
      />
    );
  }

  if (view === "view-session" && selectedSession) {
    return (
      <SessionViewer
        session={selectedSession}
        onBack={() => setView("history")}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg-main)]">
      <Header user={user} logout={logout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* HERO */}
        <section className="text-center mb-14 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-[var(--text-primary)] tracking-tight">
            Welcome back, <span className="opacity-90">{user?.name}</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-primary)]/70 max-w-2xl mx-auto">
            Build confidence. Practice smart. Refine your interview performance
            with AI-powered coaching.
          </p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="animate-slide-up delay-100">
            <StatCard
              icon={MessageSquare}
              label="Sessions"
              value="12"
              color="accent"
            />
          </div>
          <div className="animate-slide-up delay-200">
            <StatCard icon={Target} label="Topics" value="8" color="accent" />
          </div>
          <div className="animate-slide-up delay-300">
            <StatCard icon={Clock} label="Hours" value="15.5" color="accent" />
          </div>
        </section>

        {/* PRACTICE MODES */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="animate-fade-in-up delay-100 group">
            <PracticeModeCard
              icon={BookOpen}
              title="Ask AI Questions"
              description="Ask any interview question and get structured AI answers"
              color="accent"
              onClick={() => {
                setPracticeMode("ai-answers");
                setView("practice");
              }}
            />
          </div>

          <div className="animate-fade-in-up delay-200 group">
            <PracticeModeCard
              icon={MessageSquare}
              title="Practice Answering"
              description="Answer AI questions and receive instant, actionable feedback"
              color="accent"
              onClick={() => {
                setPracticeMode("user-answers");
                setView("practice");
              }}
            />
          </div>

          <div className="animate-fade-in-up delay-300 group">
            <PracticeModeCard
              icon={History}
              title="View History"
              description="Track your past sessions and measure improvement over time"
              color="accent"
              onClick={() => setView("history")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
