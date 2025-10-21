"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category } from "@/lib/categories/model/categories_data";
import { getCategories } from "@/lib/categories/service/category_service";

const MenuCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await getCategories();

        // Limit to first 6 categories for the sidebar menu
        setCategories(fetchedCategories.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch categories for menu:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mt-9 mb-[60px] flex flex-wrap gap-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="px-[25px] py-[10px] rounded-[10px] text-sm bg-gray-200 animate-pulse h-8 w-16"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-9 mb-[60px] flex flex-wrap gap-5">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/posts?category=${encodeURIComponent(
            category.name || category.title || ""
          )}`}
          className="px-[25px] py-[10px] rounded-[10px] text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: category.color ? `${category.color}33` : "#f3f4f6", // Add 33 for 20% opacity
          }}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
