"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import CategoryList from "@/lib/categories/categories_list";
import Featured from "@/lib/commons/featured/featured";
import CardList from "@/lib/commons/lists/cards_list";
import Menu from "@/lib/commons/menu/menu";
import { emptyArray } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>(emptyArray);

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
      <div className="flex gap-[50px]">
        <CardList page={1} mockData={articles} />
        <Menu />
      </div>
    </main>
  );
}
