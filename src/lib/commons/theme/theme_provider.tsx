"use client";
import { ThemeContext } from "@/lib/commons/context/theme_context";
import React, { useContext, ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, mounted } = useContext(ThemeContext);

  return <div className={!mounted ? "light" : theme}>{children}</div>;
};
export default ThemeProvider;
