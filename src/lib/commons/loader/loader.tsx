"use client";

import React from "react";

interface LoaderProps {
  message?: string;
}

export default function Loader({
  message = "Loading content...",
}: LoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-full py-12 px-4">
      <div className="flex flex-col items-center gap-8">
        {/* Animated rings */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Ring 1 - Outer */}
          <div
            className="absolute w-20 h-20 rounded-full border-2 border-transparent border-t-blue-400 border-r-blue-400 animate-spin"
            style={{ animationDuration: "2s" }}
          ></div>

          {/* Ring 2 - Middle */}
          <div
            className="absolute w-[60px] h-[60px] rounded-full border-2 border-transparent border-b-blue-500 border-l-blue-500"
            style={{
              animation:
                "spin 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse",
            }}
          ></div>

          {/* Ring 3 - Inner */}
          <div
            className="absolute w-10 h-10 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Pulsing core */}
          <div className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-[0_0_20px_rgba(96,165,250,0.5)] animate-pulse"></div>
        </div>

        {/* Loading text with animated dots */}
        <p className="text-base font-medium text-gray-400 tracking-wide flex items-center gap-0.5">
          {message}
          <span className="inline-flex ml-0.5">
            <span
              className="animate-[blink_1.4s_infinite]"
              style={{ animationDelay: "0s" }}
            >
              .
            </span>
            <span
              className="animate-[blink_1.4s_infinite]"
              style={{ animationDelay: "0.2s" }}
            >
              .
            </span>
            <span
              className="animate-[blink_1.4s_infinite]"
              style={{ animationDelay: "0.4s" }}
            >
              .
            </span>
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          20% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
