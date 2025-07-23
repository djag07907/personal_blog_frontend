"use client";

import React from "react";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, hasPrev, hasNext, setPage }) => {
  const handleNavigate = (newPage: number) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex justify-between mt-10">
      <button
        onClick={() => handleNavigate(page - 1)}
        disabled={!hasPrev}
        className={`w-28 px-4 py-3 text-white rounded-sm transition ${
          hasPrev
            ? "bg-crimson hover:bg-red-700 cursor-pointer"
            : "bg-[rgba(220,20,60,0.47)] cursor-not-allowed"
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handleNavigate(page + 1)}
        disabled={!hasNext}
        className={`w-28 px-4 py-3 text-white rounded-sm transition ${
          hasNext
            ? "bg-crimson hover:bg-red-700 cursor-pointer"
            : "bg-[rgba(220,20,60,0.47)] cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
