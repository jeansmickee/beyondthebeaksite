import "./globals.css";
import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";

const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Beyond the Beak",
  description: "Journeys for the curious and kind.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-[#f6f2ea] text-[#1c241c]">{children}</body>
    </html>
  );
}