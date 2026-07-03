"use client";

export default function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-center py-3">
      <span className="px-3 py-1 text-xs rounded-lg" style={{ background: "rgba(0,0,0,0.3)", color: "var(--text-secondary)" }}>
        {date}
      </span>
    </div>
  );
}
