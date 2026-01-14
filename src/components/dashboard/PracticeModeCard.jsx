import React from "react";
import { ChevronRight } from "lucide-react";

export default function PracticeModeCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-[var(--bg-surface)] rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer group"
    >
      {/* Icon */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--accent)] rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--text-primary)]" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-[var(--text-primary)]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base mb-5 sm:mb-6 text-[var(--text-primary)]/70">
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center font-semibold text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
        Start
        <ChevronRight className="w-5 h-5 ml-1" />
      </div>
    </div>
  );
}
