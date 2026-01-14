import React from "react";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
      {/* Icon */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-primary)]" />
      </div>

      {/* Label */}
      <p className="text-xs sm:text-sm mb-1 text-[var(--text-primary)]/70">
        {label}
      </p>

      {/* Value */}
      <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}
