import React from "react";
import { Brain, User, LogOut } from "lucide-react";

export default function Header({ user, logout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-surface)]/90 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--accent)]">
            <Brain className="w-6 h-6 text-[var(--text-primary)]" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            AI Interview Coach
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-[#FFF8E8] border border-[var(--accent)] rounded-lg">
            <User className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {user?.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[var(--text-primary)] text-[#FFF8E8] hover:opacity-90 transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
