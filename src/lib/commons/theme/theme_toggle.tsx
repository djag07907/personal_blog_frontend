"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../context/theme_context";

const ThemeToggle: React.FC = () => {
  const { toggle, theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <div
      onClick={toggle}
      className={`
        w-10 h-5 rounded-full cursor-pointer relative flex items-center justify-between px-1
        ${isDark ? "bg-white" : "bg-slate-900"}
      `}
    >
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <Image src="/sun.png" alt="sun" width={14} height={14} />

      <div
        className={`
          w-[15px] h-[15px] rounded-full absolute transition-all duration-300
          ${isDark ? "left-[2px] bg-slate-900" : "right-[2px] bg-white"}
        `}
      />
    </div>
  );
};

export default ThemeToggle;
