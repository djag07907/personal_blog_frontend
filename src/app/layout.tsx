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
  const { theme, mounted } = useContext(ThemeContext);

  const staticBodyClass = `${inter.className}`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={staticBodyClass}>
        <div className={`app-container ${!mounted ? "light" : theme}`}>
          <div className="wrapper">
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};
