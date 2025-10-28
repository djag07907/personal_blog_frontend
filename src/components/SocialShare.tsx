"use client";

import { useState } from "react";
import { Facebook, Link2, Check } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Share
      </span>

      <div className="flex items-center gap-2">
        {/* Facebook */}
        <button
          onClick={handleFacebookShare}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-300 dark:border-gray-600 rounded-md hover:border-blue-600 dark:hover:border-blue-400 transition-all"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
          <span>Facebook</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md transition-all ${
            copied
              ? "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400"
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white"
          }`}
          title={copied ? "Link copied!" : "Copy link"}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
};
