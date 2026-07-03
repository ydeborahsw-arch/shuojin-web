"use client";

import { useState } from "react";

interface ThinkingBlockProps {
  content: string;
}

export default function ThinkingBlock({ content }: ThinkingBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mb-1 text-xs cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-1 px-1 py-0.5 rounded" style={{ color: "var(--text-secondary)" }}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-shrink-0"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span style={{ fontSize: "11px" }}>思考过程</span>
      </div>
      {open && (
        <div
          className="mt-1 px-2 py-1.5 rounded-lg text-xs whitespace-pre-wrap"
          style={{
            background: "rgba(94, 170, 222, 0.08)",
            border: "1px solid rgba(94, 170, 222, 0.15)",
            color: "var(--text-secondary)",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
