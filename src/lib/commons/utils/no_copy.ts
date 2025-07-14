"use client";
import { useEffect } from "react";

export function useContentProtection() {
  useEffect(() => {
    const disableCopy = (e: any) => e.preventDefault();
    const disableContext = (e: any) => e.preventDefault();

    document.addEventListener("copy", disableCopy);
    document.addEventListener("cut", disableCopy);
    document.addEventListener("contextmenu", disableContext);

    return () => {
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("cut", disableCopy);
      document.removeEventListener("contextmenu", disableContext);
    };
  }, []);
}
