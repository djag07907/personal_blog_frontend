"use client";
import React, { useContext, ReactNode } from "react";
import { ThemeContext } from "../context/theme_context";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, mounted } = useContext(ThemeContext);

  return <div className={!mounted ? "light" : theme}>{children}</div>;
};
export default ThemeProvider;
