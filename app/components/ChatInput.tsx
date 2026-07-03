"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import type { Message } from "./ChatBubble";

interface ChatInputProps {
  onSend: (text: string) => void;
  onImageUpload: (file: File) => void;
  onFileUpload: (file: File) => void;
  replyTo: Message | null;
  onCancelReply: () => void;
}

export default function ChatInput({ onSend, onImageUpload, onFileUpload, replyTo, onCancelReply }: ChatInputProps) {
  const [text, setText] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const stickers = ["😘", "🥺", "😍", "🤣", "😭", "💕", "🫶", "😏", "🙄", "😤", "🥰", "😈", "💋", "🤗", "😴", "🫣"];

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ background: "var(--bg-input)", borderTop: "1px solid var(--border-color)" }}>
      {replyTo && (
        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2 text-xs overflow-hidden" style={{ color: "var(--text-secondary)" }}>
            <div className="w-0.5 h-4 rounded flex-shrink-0" style={{ background: "var(--accent)" }} />
            <span className="font-medium flex-shrink-0">{replyTo.sender === "jinjin" ? "今今" : "言铄"}</span>
            <span className="truncate">{replyTo.text || "[图片]"}</span>
          </div>
          <button onClick={onCancelReply} className="p-0.5 hover:bg-white/10 rounded flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="flex items-end gap-2 p-3">
        <button
          onClick={() => imageRef.current?.click()}
          className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-white/10"
          title="发送图片"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImageUpload(f);
              e.target.value = "";
            }}
          />
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-white/10"
          title="上传文件"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileUpload(f);
              e.target.value = "";
            }}
          />
        </button>
        <button
          onClick={() => setShowStickers(!showStickers)}
          className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-white/10"
          title="表情"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          rows={1}
          className="flex-1 resize-none rounded-xl px-4 py-2 text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.07)",
            color: "var(--text-primary)",
            maxHeight: "120px",
            minHeight: "38px",
          }}
        />
        <button
          onClick={handleSend}
          className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-white/10"
          title="发送"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
      {showStickers && (
        <div className="px-3 pb-3 grid grid-cols-8 gap-1">
          {stickers.map((s) => (
            <button
              key={s}
              onClick={() => { onSend(s); setShowStickers(false); }}
              className="text-2xl p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
