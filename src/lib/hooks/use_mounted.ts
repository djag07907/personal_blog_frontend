"use client";
import { useEffect, useState } from "react";

/**
 * Hook to prevent hydration mismatches by tracking mount state
 * Use this when you need to access browser-only APIs or localStorage
 * 
 * @example
 * const mounted = useMounted();
 * if (!mounted) return <div>Loading...</div>; // or return SSR-safe content
 * // Now safe to use browser APIs
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Hook for safely accessing localStorage with SSR
 * Returns null during SSR, actual value after hydration
 * 
 * @param key - localStorage key
 * @param defaultValue - default value to use
 * @example
 * const theme = useLocalStorage('theme', 'light');
 */
export function useLocalStorage<T>(key: string, defaultValue: T): T | null {
  const [storedValue, setStoredValue] = useState<T | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted) {
      try {
        const item = window.localStorage.getItem(key);
        const value = item ? JSON.parse(item) : defaultValue;
        setStoredValue(value);
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        setStoredValue(defaultValue);
      }
    }
  }, [key, defaultValue, mounted]);

  const setValue = (value: T | ((val: T) => T)) => {
    if (!mounted) return;
    
    try {
      setStoredValue(value instanceof Function ? value(storedValue || defaultValue) : value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return mounted ? storedValue : null;
}
