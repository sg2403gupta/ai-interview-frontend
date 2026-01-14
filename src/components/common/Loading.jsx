import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-main)] px-4">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block w-12 h-12 sm:w-14 sm:h-14 border-4 border-[var(--accent)] border-t-[var(--text-primary)] rounded-full animate-spin mb-4"></div>

        {/* Text */}
        <p className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
          Loading...
        </p>
      </div>
    </div>
  );
}
