"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Category } from "@/lib/categories/model/categories_data";
import { getCategories } from "@/lib/categories/service/category_service";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // You could fallback to mock data here if needed
        // setCategories(mockCategories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="my-12">
      <h1 className="text-xl font-semibold mb-12 drop-shadow-sm">
        Popular Categories
      </h1>
      <div className="flex flex-wrap justify-between gap-5">
        {categories.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            key={item.id}
            className="capitalize flex items-center justify-center gap-2 font-medium text-sm w-[15%] h-20 rounded-lg transition-transform hover:opacity-90 hover:scale-[1.02] xl:w-[20%] lg:w-[25%] md:w-[45%] sm:w-full drop-shadow-sm"
            style={{
              backgroundColor: item.color ? `${item.color}33` : "#f3f4f6",
            }}
          >
            {(item.img || item.image?.url) && (
              <Image
                src={item.img || item.image?.url || ""}
                alt={item.title || item.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            {item.title || item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
