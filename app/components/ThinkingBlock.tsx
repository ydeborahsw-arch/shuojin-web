"use client";

import { useState } from "react";

interface ThinkingBlockProps {
  content: string;
}

export default function ThinkingBlock({ content }: ThinkingBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mt-1 mb-1 rounded-lg text-sm cursor-pointer select-none"
      style={{ background: "rgba(94, 170, 222, 0.1)", border: "1px solid rgba(94, 170, 222, 0.2)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
          <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
        </svg>
        <span style={{ color: "var(--accent)" }}>思考过程</span>
      </div>
      {open && (
        <div className="px-3 pb-3 text-xs whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
          {content}
        </div>
      )}
    </div>
  );
}
