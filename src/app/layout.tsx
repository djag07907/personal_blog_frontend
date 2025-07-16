"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/lib/commons/navBar/navbar";
import "@/lib/styles/globals.css";
import Footer from "@/lib/commons/footer/footer";
import {
  ThemeContext,
  ThemeContextProvider,
} from "@/lib/commons/context/theme_context";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "My Tech Blog",
  description: "A blog to share articles about tech, software, and more."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <InnerLayout>{children}</InnerLayout>
    </ThemeContextProvider>
  );
}
const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-circuit-pattern ${
          theme === "dark" ? "dark" : "light"
        }`}
      >
        <div className="container">
          <div className="wrapper">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};
