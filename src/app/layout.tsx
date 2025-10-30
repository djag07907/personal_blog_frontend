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

const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
    template: "%s | Daniel Alvarez",
  },
  description:
    "Personal tech blog by Daniel Alvarez. Exploring web development, software engineering, and technology. Share insights on React, Next.js, Node.js, and modern development practices.",
  keywords: [
    "Daniel Alvarez",
    "software developer",
    "full stack developer",
    "web development",
    "tech blog",
    "Flutter",
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Strapi",
    "software engineering",
    "programmer",
    "developer",
    "technology",
    "coding tutorials",
    "web applications",
    "frontend development",
    "backend development",
    "modern web",
    "software architecture",
    "project management",
    "agile development",
    "programming",
    "coding",
  ],
  authors: [{ name: "Daniel Alvarez" }],
  creator: "Daniel Alvarez",
  publisher: "Daniel Alvarez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
    description:
      "Personal tech blog exploring web development, software engineering, and technology.",
    siteName: "Daniel Alvarez Blog",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Daniel Alvarez - Web and Mobile Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
    description:
      "Personal blog exploring web development, software engineering, and technology.",
    images: ["/profile.png"],
    creator: "@djag_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/laptop.png", sizes: "any" },
      { url: "/laptop.png", type: "image/png" },
    ],
    shortcut: "/laptop.png",
    apple: "/laptop.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

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
        <link rel="icon" href="/laptop.png" type="image/png" />
        <link rel="apple-touch-icon" href="/laptop.png" />
        <meta name="theme-color" content="#000000" />
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
