"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { COLORS } from "@/lib/constants/colors_constants";
import { Category } from "@/lib/categories/model/categories_data";
import { mockCategories } from "@/lib/categories/model/mock_categories";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Simulate async fetch from mock data
    setTimeout(() => {
      setCategories(mockCategories);
    }, 100);
  }, []);

  const getColorBySlug = (slug: string) => {
    return COLORS[slug as keyof typeof COLORS] || COLORS.default;
  };

  return (
    <div className="my-12">
      <h1 className="text-xl font-semibold mb-12">Popular Categories</h1>
      <div className="flex flex-wrap justify-between gap-5">
        {categories.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            key={item.id}
            className={`capitalize flex items-center justify-center gap-2 font-medium text-sm w-[15%] h-20 rounded-lg transition-transform hover:opacity-90 hover:scale-[1.02] ${getColorBySlug(
              item.slug
            )} 
              xl:w-[20%] lg:w-[25%] md:w-[45%] sm:w-full`}
          >
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
