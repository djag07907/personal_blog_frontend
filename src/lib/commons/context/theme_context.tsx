"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
// Define the shape of the context
export const ThemeContext = createContext<{
  theme: string;
  toggle: () => void;
}>({
  theme: "light",
  toggle: () => {},
});
// Function to get the theme from local storage
const getFromLocalStorage = (): string => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
  return "light";
};
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    return getFromLocalStorage();
  });
  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    // Apply the theme class to the body
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
