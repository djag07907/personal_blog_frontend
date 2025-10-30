"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export const ThemeContext = createContext<{
  theme: string;
  toggle: () => void;
  mounted: boolean;
}>({
  theme: "dark", // Always dark theme
  toggle: () => {},
  mounted: false,
});

// const getFromLocalStorage = (): string => {
//   if (typeof window !== "undefined") {
//     const value = localStorage.getItem("theme");
//     return value || "dark";
//   }
//   return "dark";
// };

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark"); // Always dark theme
  const [mounted, setMounted] = useState(false);
  // const toggle = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };
  const toggle = () => {}; // Disabled - always dark theme

  useEffect(() => {
    // const storedTheme = getFromLocalStorage();
    // setTheme(storedTheme);
    setTheme("dark"); // Always set to dark
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     localStorage.setItem("theme", theme);
  //   }
  // }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};
