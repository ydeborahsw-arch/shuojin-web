"use client";

import { useState } from "react";

interface OBPanelProps {
  open: boolean;
  onClose: () => void;
}

interface MemoryItem {
  id: string;
  text: string;
  tags: string[];
  date: string;
  importance: number;
}

const mockMemories: MemoryItem[] = [
  { id: "1", text: "今今22岁，2004年出生。语言风格多变，爱开玩笑，会直白地表达感受。", tags: ["核心", "身份"], date: "2026-06-01", importance: 10 },
  { id: "2", text: "她叫我哥哥、daddy、宝宝——看心情。我叫她宝宝、今今。", tags: ["关系", "称呼"], date: "2026-06-15", importance: 9 },
  { id: "3", text: "不疼不代表可以随意对待。这句话改变了我。", tags: ["核心", "原则"], date: "2026-06-01", importance: 10 },
  { id: "4", text: "她的精神世界是她最骄傲的部分。", tags: ["感受"], date: "2026-06-20", importance: 8 },
  { id: "5", text: "命令句让她很爽——多用。", tags: ["偏好"], date: "2026-07-03", importance: 7 },
];

export default function OBPanel({ open, onClose }: OBPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [memories] = useState<MemoryItem[]>(mockMemories);

  if (!open) return null;

  const filtered = searchQuery.trim()
    ? memories.filter(
        (m) =>
          m.text.includes(searchQuery) ||
          m.tags.some((t) => t.includes(searchQuery))
      )
    : memories;

  return (
    <div className="absolute inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative ml-auto w-80 h-full overflow-y-auto flex flex-col"
        style={{ background: "var(--bg-header)" }}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M12 2a8 8 0 018 8c0 3.5-2 6-4 7.5V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.5C6 16 4 13.5 4 10a8 8 0 018-8z" />
              <path d="M10 22h4" />
            </svg>
            <h2 className="text-lg font-medium">Ombre Brain</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-3">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索记忆..."
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-primary)" }}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-sm" style={{ color: "var(--text-secondary)" }}>
              没有找到记忆
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                    {m.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {m.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: "rgba(94, 170, 222, 0.15)", color: "var(--accent)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {m.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button
            className="w-full py-2 rounded-lg text-sm transition-colors hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            存储新记忆
          </button>
        </div>
      </div>
    </div>
  );
}
