"use client";

import { useState } from "react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  backendMode: "cc-sdk" | "api";
  onBackendModeChange: (mode: "cc-sdk" | "api") => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onAvatarChange: (who: "jinjin" | "yansuo", file: File) => void;
  onBgChange: (file: File) => void;
}

export default function SettingsPanel({
  open,
  onClose,
  backendMode,
  onBackendModeChange,
  apiKey,
  onApiKeyChange,
  onAvatarChange,
  onBgChange,
}: SettingsPanelProps) {
  const [localKey, setLocalKey] = useState(apiKey);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative ml-auto w-80 h-full overflow-y-auto flex flex-col"
        style={{ background: "var(--bg-header)" }}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="text-lg font-medium">设置</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          <section>
            <h3 className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>后端模式</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onBackendModeChange("cc-sdk")}
                className="flex-1 py-2 px-3 rounded-lg text-sm transition-colors"
                style={{
                  background: backendMode === "cc-sdk" ? "var(--accent)" : "rgba(255,255,255,0.07)",
                  color: backendMode === "cc-sdk" ? "#fff" : "var(--text-secondary)",
                }}
              >
                CC SDK
              </button>
              <button
                onClick={() => onBackendModeChange("api")}
                className="flex-1 py-2 px-3 rounded-lg text-sm transition-colors"
                style={{
                  background: backendMode === "api" ? "var(--accent)" : "rgba(255,255,255,0.07)",
                  color: backendMode === "api" ? "#fff" : "var(--text-secondary)",
                }}
              >
                API
              </button>
            </div>
            {backendMode === "api" && (
              <div className="mt-3">
                <input
                  type="password"
                  value={localKey}
                  onChange={(e) => setLocalKey(e.target.value)}
                  onBlur={() => onApiKeyChange(localKey)}
                  placeholder="Anthropic API Key"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-primary)" }}
                />
              </div>
            )}
          </section>

          <section>
            <h3 className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>头像</h3>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <label className="cursor-pointer">
                  <div className="w-16 h-16 rounded flex items-center justify-center text-xs" style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-secondary)" }}>
                    今今
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onAvatarChange("jinjin", f);
                    }}
                  />
                </label>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>点击更换</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <label className="cursor-pointer">
                  <div className="w-16 h-16 rounded flex items-center justify-center text-xs" style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-secondary)" }}>
                    言铄
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onAvatarChange("yansuo", f);
                    }}
                  />
                </label>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>点击更换</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>聊天背景</h3>
            <label className="cursor-pointer">
              <div
                className="w-full py-3 rounded-lg text-center text-sm transition-colors hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.07)", color: "var(--text-secondary)" }}
              >
                选择背景图片
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onBgChange(f);
                }}
              />
            </label>
          </section>
        </div>
      </div>
    </div>
  );
}
