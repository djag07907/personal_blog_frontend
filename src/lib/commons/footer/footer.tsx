import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 py-5 flex flex-col md:flex-row items-start md:items-center justify-between text-gray-500 dark:text-gray-400 gap-12 md:gap-0">
      {/* Info Section */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Image src="/profile.png" alt="daniel blog" width={50} height={50} />
          <h1 className="text-2xl font-semibold">Daniel Alvarez</h1>
        </div>
        <p className="font-light max-w-md">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
          necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
          porro sequi, totam minima consequuntur, aspernatur deleniti vero
          repellendus dorales.
        </p>
        <div className="mt-2 flex gap-3">
          <Image src="/linkedin.png" alt="Facebook" width={18} height={18} />
          <Image src="/instagram.png" alt="Instagram" width={18} height={18} />
          <Image src="/profile.png" alt="Tiktok" width={18} height={18} />
        </div>
      </div>

      {/* Links Section */}
      <div className="flex-1 flex justify-end gap-24 flex-wrap md:flex-nowrap">
        <div className="flex flex-col gap-2 font-light min-w-[100px]">
          <span className="font-bold">Links</span>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className="flex flex-col gap-2 font-light min-w-[100px]">
          <span className="font-bold">Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className="flex flex-col gap-2 font-light min-w-[100px]">
          <span className="font-bold">Social</span>
          <Link href="/">Instagram</Link>
          <Link href="/">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
