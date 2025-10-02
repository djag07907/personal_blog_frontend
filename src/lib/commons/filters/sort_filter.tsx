"use client";

import React from "react";

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

interface SortFilterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="w-full max-w-xs">
      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        style={{
          backgroundColor: "var(--content-bg)",
          color: "var(--content-text)",
          borderColor: "var(--content-text-muted, #9ca3af)",
        }}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>
    </div>
  );
};

export default SortFilter;
