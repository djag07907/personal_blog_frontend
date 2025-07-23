"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/lib/commons/theme/theme_toggle";

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-20 px-4">
      {/* Social Icons */}
      <div className="flex gap-8 flex-1 max-[1024px]:hidden flex-nowrap">
        <Image src="/instagram.png" alt="instagram" width={35} height={35} />
        <Image src="/linkedin.png" alt="linkedin" width={35} height={35} />
        <Image src="/profile.png" alt="portfolio" width={35} height={35} />
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
        {/* Daniel Alvarez */}
      </div>

      {/* Navigation Links */}
      <div
        className="
    flex items-center gap-8 flex-1 text-lg justify-end flex-nowrap
    max-[1280px]:text-base max-[1280px]:gap-6
    max-[640px]:justify-end
  "
      >
        <ThemeToggle />
        <Link href="/" className="max-[640px]:hidden px-4">
          {" "}
          Home
        </Link>
        <Link href="/contact" className="max-[640px]:hidden px-4">
          {" "}
          Contact
        </Link>
        <Link href="/about" className="max-[640px]:hidden px-4">
          {" "}
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
