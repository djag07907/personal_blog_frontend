"use client";

import React from "react";
// import Image from "next/image";
import Link from "next/link";
// import ThemeToggle from "@/lib/commons/theme/theme_toggle"; // Commented out - always dark theme

const Navbar: React.FC = () => {
  return (
    <div
      className="
      fixed top-0 left-0 right-0 z-50
      backdrop-blur-xl bg-white/20 dark:bg-black/10
      border-b border-white/20 dark:border-white/10
      shadow-lg
      supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-black/10
    "
    >
      <div className="flex items-center justify-between h-16 px-4">
        {/* Social Icons */}
        {/* <div className="flex gap-8 flex-1 max-[1024px]:hidden flex-nowrap">
          <Image
            src="/instagram.png"
            alt="instagram"
            width={35}
            height={35}
            className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
          <Image
            src="/linkedin.png"
            alt="linkedin"
            width={35}
            height={35}
            className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
          <Image
            src="/profile.png"
            alt="portfolio"
            width={35}
            height={35}
            className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
        </div> */}

        {/* Logo */}
        {/* <div
          className="
          flex-1 text-center text-4xl font-bold 
          max-[1280px]:text-3xl 
          max-[768px]:text-2xl 
          max-[1024px]:text-left
        "
        > */}
        {/* Daniel Alvarez */}
        {/* </div> */}

        {/* Navigation Links */}
        <div
          className="
          flex items-center gap-8 flex-1 text-lg justify-end flex-nowrap
          max-[1280px]:text-base max-[1280px]:gap-6
          max-[640px]:justify-end
        "
        >
          {/* <ThemeToggle /> */} {/* Commented out - always dark theme */}
          <Link
            href="/"
            className="max-[640px]:hidden px-4 hover:opacity-80 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="max-[640px]:hidden px-4 hover:opacity-80 transition-opacity"
          >
            Posts
          </Link>
          <Link
            href="/contact"
            className="max-[640px]:hidden px-4 hover:opacity-80 transition-opacity"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="max-[640px]:hidden px-4 hover:opacity-80 transition-opacity"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
