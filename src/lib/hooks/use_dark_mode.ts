"use client";
import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") === "dark";
    setDarkMode(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  const toggleDarkMode = () => {
    if (!mounted) return;

    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return { darkMode, toggleDarkMode, mounted };
}
