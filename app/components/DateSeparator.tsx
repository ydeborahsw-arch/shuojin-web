"use client";

export default function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center justify-center py-3">
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {date}
      </span>
    </div>
  );
}
