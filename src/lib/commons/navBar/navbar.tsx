"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../theme/theme_toggle";

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-24 px-4">
      {/* Social Icons */}
      <div className="flex gap-2 flex-1 max-[1024px]:hidden">
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/linkedin.png" alt="linkedin" width={24} height={24} />
        <Image src="/profile.png" alt="portfolio" width={24} height={24} />
      </div>

      {/* Logo */}
      <div
        className="
          flex-1 text-center text-4xl font-bold 
          max-[1280px]:text-3xl 
          max-[768px]:text-2xl 
          max-[1024px]:text-left
        "
      >
        lamablog
      </div>

      {/* Navigation Links */}
      <div
        className="
          flex items-center gap-5 flex-1 text-lg justify-end
          max-[1280px]:text-base max-[1280px]:gap-4
          max-[640px]:justify-end
        "
      >
        <ThemeToggle />
        <Link href="/" className="max-[640px]:hidden">
          Homepage
        </Link>
        <Link href="/contact" className="max-[640px]:hidden">
          Contact
        </Link>
        <Link href="/about" className="max-[640px]:hidden">
          About
        </Link>
        {/* <AuthLinks /> */}
      </div>
    </div>
  );
};

export default Navbar;
