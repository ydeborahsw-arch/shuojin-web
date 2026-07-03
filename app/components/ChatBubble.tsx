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
  replyTo?: { id: string; sender: string; text: string };
}

interface ChatBubbleProps {
  message: Message;
  avatarJinjin: string;
  avatarYansuo: string;
  onReply?: (msg: Message) => void;
}

export default function ChatBubble({ message, avatarJinjin, avatarYansuo, onReply }: ChatBubbleProps) {
  const isSelf = message.sender === "jinjin";
  const avatar = isSelf ? avatarJinjin : avatarYansuo;

  return (
    <div className={`flex gap-2 px-4 py-1 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
      <img
        src={avatar}
        alt={isSelf ? "今今" : "言铄"}
        className="w-9 h-9 flex-shrink-0 object-cover mt-1"
        style={{ borderRadius: "4px" }}
      />
      <div className={`flex flex-col max-w-[75%] ${isSelf ? "items-end" : "items-start"}`}>
        {message.thinking && <ThinkingBlock content={message.thinking} />}
        <div
          className={`relative px-3 py-2 text-sm leading-relaxed break-words ${isSelf ? "bubble-tail-right" : "bubble-tail-left"}`}
          style={{
            background: isSelf ? "var(--bg-bubble-self)" : "var(--bg-bubble-other)",
            borderRadius: isSelf ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
            color: "var(--text-bubble)",
          }}
          onDoubleClick={() => onReply?.(message)}
        >
          {message.replyTo && (
            <div
              className="mb-1 px-2 py-1 rounded text-xs border-l-2"
              style={{
                background: "rgba(0,0,0,0.06)",
                borderColor: "var(--accent)",
                color: "var(--text-bubble)",
                opacity: 0.8,
              }}
            >
              <span className="font-medium">{message.replyTo.sender === "jinjin" ? "今今" : "言铄"}</span>
              <div className="truncate">{message.replyTo.text}</div>
            </div>
          )}
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
        <span className="text-xs mt-1 px-1" style={{ color: "var(--text-secondary)", fontSize: "11px" }}>
          {message.time}
        </span>
      </div>
    </div>
  );
}
