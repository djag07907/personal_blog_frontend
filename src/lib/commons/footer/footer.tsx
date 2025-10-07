import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="mt-16 py-12 w-full border-t"
      style={{
        backgroundColor: "var(--footer-bg)",
        borderColor: "var(--footer-border)",
        color: "var(--footer-text)",
      }}
    >
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/profile.png"
                alt="Daniel Alvarez"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-xl font-bold">Daniel Alvarez</h2>
            </div>
            <p className="mb-6 leading-relaxed max-w-md opacity-90">
              Full-stack web & mobile software engineer passionate about
              creating innovative web and mobile solutions. I write about modern
              technologies, best practices, and share insights from my
              development journey.
            </p>
            <div className="text-sm opacity-75">
              © {new Date().getFullYear()} Daniel Alvarez. All rights reserved.
            </div>
          </div>

          <div className="flex flex-wrap gap-16 lg:gap-20">
            <div className="min-w-[120px]">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="min-w-[120px]">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/posts?category=frontend"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Frontend
                </Link>
                <Link
                  href="/posts?category=backend"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Backend
                </Link>
                <Link
                  href="/posts?category=tutorials"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Tutorials
                </Link>
                <Link
                  href="/posts?category=career"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  Career
                </Link>
              </div>
            </div>

            <div className="min-w-[120px]">
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/djag-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100 hover:text-blue-300 transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/djag07907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-75 hover:opacity-100 transition-all"
                >
                  GitHub
                </a>

                <a
                  href="mailto:daniel.alvarez@sonofalvasolutions.com"
                  className="opacity-75 hover:opacity-100 hover:text-green-300 transition-all"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t"
          style={{
            borderColor: "var(--footer-border)",
          }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* <p className="text-sm text-muted">
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p> */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="opacity-75 hover:opacity-100 transition-all"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="opacity-75 hover:opacity-100 transition-all"
              >
                Terms
              </Link>
              <Link
                href="/sitemap.xml"
                className="opacity-75 hover:opacity-100 transition-all"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
