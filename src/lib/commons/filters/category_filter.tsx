"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@/lib/categories/model/categories_data";
import { getCategories } from "@/lib/categories/service/category_service";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full max-w-xs">
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        style={{
          backgroundColor: "var(--content-bg)",
          color: "var(--content-text)",
          borderColor: "var(--content-text-muted, #9ca3af)",
        }}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.title || category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
