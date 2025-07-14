import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/lib/commons/navBar/navbar";

import "@/lib/styles/globals.css";

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "A blog to share articles about tech, software, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-noise-pattern">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
