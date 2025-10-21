"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Loader from "@/lib/commons/loader/loader";

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading content");

  const showLoader = (customMessage?: string) => {
    setMessage(customMessage || "Loading content");
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, message, showLoader, hideLoader }}
    >
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--content-bg)] rounded-2xl shadow-2xl p-8 max-w-md mx-4">
            <Loader message={message} />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
