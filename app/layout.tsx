import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "铄今",
  description: "言铄和今今的对话",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
