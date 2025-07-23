"use client";

import React from "react";
import { Article } from "@/lib/article/model/article_data";
import { emptyString } from "@/lib/constants/constants";
import Card from "@/lib/commons/cards/card";
import Pagination from "@/lib/commons/pagination/pagination";

interface CardItem {
  id: string;
  title: string;
  desc: string;
  slug: string;
  createdAt: string;
  catSlug: string;
  img?: string;
}

interface CardListProps {
  page: number;
  mockData: Article[];
  setPage: (page: number) => void;
}

const POST_PER_PAGE = 4;

const CardList = ({ page, mockData, setPage }: CardListProps) => {
  const transformedPosts: CardItem[] = mockData.map((item, idx) => ({
    id: String(item.id ?? idx),
    title: item.title,
    desc: item.description,
    slug: item.slug,
    createdAt: item.publishedAt ?? new Date().toISOString(),
    catSlug: item.category ?? "General",
    img: item.image?.url ?? emptyString,
  }));

  const count = transformedPosts.length;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  const paginatedPosts = transformedPosts.slice(
    POST_PER_PAGE * (page - 1),
    POST_PER_PAGE * page
  );

  return (
    <div className="flex-2 pt-10">
      <h1 className="text-3xl font-bold mb-12">Recent Posts</h1>
      <div className="flex flex-col gap-4 transition-opacity duration-300 ease-in-out">
        {paginatedPosts.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-12">
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} setPage={setPage} />
      </div>
    </div>
  );
};

export default CardList;
