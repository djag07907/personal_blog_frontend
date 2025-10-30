"use client";

import { Inter } from "next/font/google";
import Navbar from "@/lib/commons/navBar/navbar";
import "@/lib/styles/globals.css";
import Footer from "@/lib/commons/footer/footer";
import {
  ThemeContext,
  ThemeContextProvider,
} from "@/lib/commons/context/theme_context";
import { LoadingProvider } from "@/lib/commons/context/loading_context";
import { useContext } from "react";
import SEOHead from "@/lib/commons/seo/seo_head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <LoadingProvider>
        <InnerLayout>{children}</InnerLayout>
      </LoadingProvider>
    </ThemeContextProvider>
  );
}
const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, mounted } = useContext(ThemeContext);

  const staticBodyClass = `${inter.className}`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEOHead />
      </head>
      <body className={staticBodyClass}>
        <div className={`app-container ${!mounted ? "dark" : theme}`}>
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
