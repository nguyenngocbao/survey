import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type React from "react";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - Đại học Sư phạm TP.HCM",
  description: "Hệ thống quản trị khảo sát sinh viên",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
