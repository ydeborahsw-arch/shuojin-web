"use client";

import { useState, useRef, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  onImageUpload: (file: File) => void;
  onFileUpload: (file: File) => void;
}

export default function ChatInput({ onSend, onImageUpload, onFileUpload }: ChatInputProps) {
  const [text, setText] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
    <div className="flex items-end gap-2 p-3" style={{ background: "var(--bg-input)", borderTop: "1px solid var(--border-color)" }}>
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
  );
}
