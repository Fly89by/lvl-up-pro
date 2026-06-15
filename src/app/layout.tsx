import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "LVL UP — Branch Performance Analytics Platform",
  description: "AI-powered platform for branch performance analysis, smart inspection, and operational excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${tajawal.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-950 text-surface-50">{children}</body>
    </html>
  );
}
