"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import HeroSection from "@/lib/commons/hero/hero_section";
import ArticlesGrid from "@/lib/commons/lists/articles_grid";
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
      <HeroSection
        title="Welcome to My Blog"
        subtitle="All things tech, dev, and beyond"
      />
      <ArticlesGrid
        articles={articles.map((article) => ({
          title: article.title,
          description: article.description,
          image: article.image.url,
        }))}
      />
    </main>
  );
}
