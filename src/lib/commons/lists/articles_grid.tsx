import React from "react";
import ArticleCard from "../cards/article_card";

export default function ArticlesGrid({
  articles,
}: {
  articles: { title: string; description: string; image: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <ArticleCard key={i} {...article} />
      ))}
    </div>
  );
}
