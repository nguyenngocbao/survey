import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Nunito } from "next/font/google";
import type React from "react";
import "./globals.css";

const _nunito = Nunito({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hệ thống Khảo sát",
  description: "Hệ thống khảo sát hồ sơ điện tử",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SVG Favicon - Modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Fallback ICO for older browsers */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
