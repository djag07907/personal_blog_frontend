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
      aria-label="Toggle theme"
      className={`w-16 h-8 rounded-full cursor-pointer relative flex items-center justify-between px-1 transition-all duration-300 ${
        isDark ? "bg-slate-900" : "bg-white"
      }`}
    >
      <Image src="/moon.png" alt="Moon icon" width={20} height={20} />
      <Image src="/sun.png" alt="Sun icon" width={20} height={20} />
      <div
        className={`w-6 h-6 rounded-full absolute transition-all duration-300 ${
          isDark ? "left-1 bg-white" : "right-1 bg-slate-900"
        }`}
      />
    </div>
  );
};
export default ThemeToggle;
