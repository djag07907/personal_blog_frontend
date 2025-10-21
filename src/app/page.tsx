"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { getArticles } from "@/lib/article/service/article_service";
import CategoryList from "@/lib/categories/categories_list";
import ProfessionalHero from "@/lib/commons/hero/professional_hero";
import CardList from "@/lib/commons/lists/cards_list";
import Menu from "@/lib/commons/menu/menu";
import { emptyArray } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>(emptyArray);
  const [page, setPage] = useState(1);
  const [useMockData, setUseMockData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (useMockData) {
        // Use mock data
        setArticles(mockArticles);
        setLoading(false);
        setError(null);
      } else {
        // Fetch real data
        setLoading(true);
        setError(null);
        try {
          const fetchedArticles = await getArticles();
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Failed to fetch articles:", error);
          setError("Failed to load articles. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchArticles();
  }, [useMockData]);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <ProfessionalHero />
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        <CategoryList />
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          {loading ? (
            <div className="flex-2 pt-10">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading articles...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex-2 pt-10">
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => setUseMockData(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <CardList page={page} mockData={articles} setPage={setPage} />
          )}
          <Menu />
        </div>
        <button
          onClick={() => setUseMockData((prev) => !prev)}
          className="mt-8 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {useMockData ? "Use Real Data" : "Use Mock Data"}
        </button>
      </div>
    </main>
  );
}
