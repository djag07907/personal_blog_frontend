"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<{
  theme: string;
  toggle: () => void;
}>({
  theme: "light",
  toggle: () => {},
});

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

import { ReactNode } from "react";

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    return getFromLocalStorage() ?? "light";
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme ?? "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
