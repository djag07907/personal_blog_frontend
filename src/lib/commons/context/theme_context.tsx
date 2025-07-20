"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export const ThemeContext = createContext<{
  theme: string;
  toggle: () => void;
  mounted: boolean;
}>({
  theme: "light",
  toggle: () => {},
  mounted: false,
});

const getFromLocalStorage = (): string => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
  return "light";
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);
  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const storedTheme = getFromLocalStorage();
    setTheme(storedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
