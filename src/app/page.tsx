"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import CategoryList from "@/lib/categories/categories_list";
import Featured from "@/lib/commons/featured/featured";
import CardList from "@/lib/commons/lists/cards_list";
import Menu from "@/lib/commons/menu/menu";
import { emptyArray } from "@/lib/constants/constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>(emptyArray);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  // useEffect(() => {
  //   getArticles().then(setArticles);
  // }, []);
  useEffect(() => {
    // For mockup testing
    setArticles(mockArticles);

    // For real fetch
    // getArticles().then(setArticles);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <Featured />
      <CategoryList />
      <div className="flex gap-12">
        <CardList page={page} mockData={articles} />
        <Menu />
      </div>
    </main>
  );
}
