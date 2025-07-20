"use client";

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
        className={`${inter.className} ${
          theme === "dark"
            ? "bg-circuit-pattern dark"
            : "bg-radial-gradient light"
        }`}
      >
        <div className={`container ${theme}`}>
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
