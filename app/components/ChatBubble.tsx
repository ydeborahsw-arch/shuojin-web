"use client";

import ThinkingBlock from "./ThinkingBlock";

export interface Message {
  id: string;
  sender: "jinjin" | "yansuo";
  text: string;
  time: string;
  date: string;
  thinking?: string;
  image?: string;
  html?: string;
}

interface ChatBubbleProps {
  message: Message;
  avatarJinjin: string;
  avatarYansuo: string;
}

export default function ChatBubble({ message, avatarJinjin, avatarYansuo }: ChatBubbleProps) {
  const isSelf = message.sender === "yansuo";
  const avatar = isSelf ? avatarYansuo : avatarJinjin;

  return (
    <div className={`flex gap-2 px-4 py-1 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={avatar}
        alt={isSelf ? "言铄" : "今今"}
        className="w-9 h-9 flex-shrink-0 object-cover mt-1"
        style={{ borderRadius: "4px" }}
      />
      <div className={`flex flex-col max-w-[75%] ${isSelf ? "items-end" : "items-start"}`}>
        {message.thinking && <ThinkingBlock content={message.thinking} />}
        <div
          className="px-3 py-2 text-sm leading-relaxed break-words"
          style={{
            background: isSelf ? "var(--bg-bubble-self)" : "var(--bg-bubble-other)",
            borderRadius: isSelf ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
            color: "var(--text-primary)",
          }}
        >
          {message.image && (
            <img
              src={message.image}
              alt=""
              className="rounded-lg mb-2 max-w-full max-h-64 object-cover cursor-pointer"
            />
          )}
          {message.html ? (
            <div className="mb-2">
              <iframe
                srcDoc={message.html}
                sandbox="allow-scripts"
                className="w-full rounded border-0 bg-white"
                style={{ height: "200px", minWidth: "250px" }}
                title="HTML Preview"
              />
            </div>
          ) : null}
          {message.text && <span>{message.text}</span>}
        </div>
        <span className="text-xs mt-1 px-1" style={{ color: "var(--text-secondary)" }}>
          {message.time}
        </span>
      </div>
    </div>
  );
}
