"use client";

import { useState, useRef, useEffect } from "react";
import type { Message } from "./ChatBubble";

interface SearchBarProps {
  messages: Message[];
  onJumpTo: (id: string) => void;
  onClose: () => void;
}

export default function SearchBar({ messages, onJumpTo, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.trim()
    ? messages.filter((m) => m.text.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="absolute inset-x-0 top-0 z-50 flex flex-col" style={{ background: "var(--bg-header)" }}>
      <div className="flex items-center gap-2 p-3">
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索聊天记录..."
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-primary)" }}
        />
      </div>
      {query.trim() && (
        <div className="max-h-80 overflow-y-auto border-t" style={{ borderColor: "var(--border-color)" }}>
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
              没有找到结果
            </div>
          ) : (
            results.map((m) => (
              <button
                key={m.id}
                onClick={() => { onJumpTo(m.id); onClose(); }}
                className="w-full text-left px-4 py-3 hover:bg-white/5 border-b transition-colors"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                    {m.sender === "jinjin" ? "今今" : "言铄"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {m.date} {m.time}
                  </span>
                </div>
                <div className="text-sm truncate" style={{ color: "var(--text-primary)" }}>
                  {m.text}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
