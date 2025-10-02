import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 py-12 w-full border-t" style={{
      backgroundColor: 'var(--footer-bg)',
      borderColor: 'var(--footer-border)'
    }}>
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
              <h2 className="text-xl font-bold">
                Daniel Alvarez
              </h2>
            </div>
            <p className="text-muted mb-6 leading-relaxed max-w-md">
              Full-stack web & mobile software engineer passionate about
              creating innovative web and mobile solutions. I write about modern
              technologies, best practices, and share insights from my
              development journey.
            </p>
            <div className="text-sm text-muted">
              © {new Date().getFullYear()} Daniel Alvarez. All rights reserved.
            </div>
          </div>

          <div className="flex flex-wrap gap-16 lg:gap-20">
            <div className="min-w-[120px]">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Frontend
                </Link>
                <Link
                  href="/posts?category=backend"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Backend
                </Link>
                <Link
                  href="/posts?category=tutorials"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Tutorials
                </Link>
                <Link
                  href="/posts?category=career"
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                  className="text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/djag07907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:opacity-75 transition-colors"
                >
                  GitHub
                </a>

                <a
                  href="mailto:daniel.alvarez@sonofalvasolutions.com"
                  className="text-muted hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t" style={{
          borderColor: 'var(--footer-border)'
        }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* <p className="text-sm text-muted">
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p> */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted hover:opacity-75 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted hover:opacity-75 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-muted hover:opacity-75 transition-colors"
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
