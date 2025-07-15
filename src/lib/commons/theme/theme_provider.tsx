"use client";

import React, { useContext, useEffect, useState, ReactNode } from "react";
import { ThemeContext } from "../context/theme_context";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
