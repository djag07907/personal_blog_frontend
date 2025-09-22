"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { getEditorsPickArticles } from "@/lib/article/service/article_service";
import { formatDate } from "@/lib/commons/utils/date_format";
import { emptyArray } from "@/lib/constants/constants";
import { Category } from "@/lib/categories/model/categories_data";
import { getCategories } from "@/lib/categories/service/category_service";

// Fallback colors for mock articles only - real articles use categoryColor
const categoryColors: Record<string, string> = {
  travel: "#ff7857",
  culture: "#ffb14f",
  food: "#7fb881",
  fashion: "#ff7887",
  coding: "#775aec",
  style: "#789cff",
  frontend: "#775aec",
  backend: "#ff7857",
  css: "#789cff",
  cms: "#ffb14f",
  "ui/ux": "#ff7887",
  management: "#7fb881",
};

const EditorPickPosts = ({ withImage }: { withImage: boolean }) => {
  const getCategoryColor = (
    categoryName: string,
    categories: Category[]
  ): string => {
    const category = categories.find((cat) => cat.name === categoryName);
    console.log("Debug category matching:", {
      categoryName,
      foundCategory: category,
      categories: categories.map((c) => ({ name: c.name, color: c.color })),
    });

    let color =
      category?.color ||
      categoryColors[categoryName.toLowerCase()] ||
      "#6b7280";

    return color ? `${color}33` : "#f3f4f633";
  };
  const [articles, setArticles] = useState<Article[]>(emptyArray);
  const [categories, setCategories] = useState<Category[]>(emptyArray);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (useMockData) {
        // Use mock data filtered by editorPick
        const editorPickArticles = mockArticles.filter(
          (article) => article.editorPick
        );
        setArticles(editorPickArticles);
        setCategories([]);
        setLoading(false);
        setError(null);
      } else {
        setLoading(true);
        setError(null);
        try {
          const [fetchedArticles, fetchedCategories] = await Promise.all([
            getEditorsPickArticles(),
            getCategories(),
          ]);

          if (fetchedArticles.length === 0) {
            // Fallback to mock data if no real data is available
            const editorPickArticles = mockArticles.filter(
              (article) => article.editorPick
            );
            setArticles(editorPickArticles);
            setCategories([]);
            setUseMockData(true);
          } else {
            setArticles(fetchedArticles);
            setCategories(fetchedCategories);
            console.log(
              "Fetched categories for color matching:",
              fetchedCategories
            );
          }
        } catch (error) {
          console.error("Failed to fetch editor's pick data:", error);
          const editorPickArticles = mockArticles.filter(
            (article) => article.editorPick
          );
          setArticles(editorPickArticles);
          setCategories([]);
          setError("Using fallback data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [useMockData]);
  if (loading) {
    return (
      <div className="mt-9 mb-15 flex flex-col gap-9">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">
            Loading editor's picks...
          </p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="mt-9 mb-15 flex flex-col gap-9">
        <div className="text-center py-4">
          <p className="text-sm text-gray-600">No editor's picks available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-9 mb-15 flex flex-col gap-9">
      {articles.slice(0, 4).map((article) => (
        <Link
          href={`/posts/${article.slug}`}
          key={article.id}
          className="flex items-center gap-5 hover:opacity-80 transition-opacity"
        >
          {withImage && (
            <div className="flex-1 aspect-square relative">
              <Image
                src={article.image?.url || "/profile.png"}
                alt={`${article.author} avatar`}
                fill
                className="rounded-full border-3 border-gray-300 object-cover"
              />
            </div>
          )}

          <div className="flex-4 flex flex-col gap-1">
            <span
              className="inline-block px-2 py-[2px] rounded-[10px] text-xs text-gray-700 w-max"
              style={{
                backgroundColor: getCategoryColor(article.category, categories),
              }}
            >
              {article.category}
            </span>
            <h3 className="text-lg font-medium text-gray-600 line-clamp-2">
              {article.title}
            </h3>
            <div className="text-xs text-gray-400">
              <span>{article.author}</span>
              <span> - {formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </Link>
      ))}

      {/* Debug toggle for development */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={() => setUseMockData((prev) => !prev)}
          className="mt-4 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 self-start"
        >
          {useMockData ? "Use Real Data" : "Use Mock Data"}
        </button>
      )}
    </div>
  );
};

export default EditorPickPosts;
