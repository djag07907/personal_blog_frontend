"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { getArticleBySlug } from "@/lib/article/service/article_service";
import Menu from "@/lib/commons/menu/menu";
import { formatDate } from "@/lib/commons/utils/date_format";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
interface SinglePageProps {
  params: Promise<{
    slug: string;
  }>;
}
const SinglePage = ({ params }: SinglePageProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchArticle = async () => {
      // Prevent double fetch in React Strict Mode
      if (hasFetchedRef.current) {
        return;
      }
      hasFetchedRef.current = true;

      try {
        const { slug } = await params;
        setLoading(true);

        let data = await getArticleBySlug(slug);

        if (!data) {
          data = mockArticles.find((article) => article.slug === slug) || null;
        }

        const finalArticle = data || {
          id: 0,
          title: "Article Not Found",
          author: "Unknown",
          authorImage: { url: "" },
          description: "No description available.",
          content: "<p>No content available.</p>",
          image: { url: "" },
          publishedAt: "",
          category: "General",
          slug: slug,
          editorPick: false,
        };

        setArticle(finalArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params]);
  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-muted drop-shadow-sm">
            Loading article...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-muted text-xl drop-shadow-sm">Article not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-28">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
        <div className="w-full lg:flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 drop-shadow-sm">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-12 relative">
              <Image
                src={article.authorImage?.url || "/profile.png"}
                alt="Author Avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium drop-shadow-sm">
                {article.author}
              </span>
              <span className="text-muted drop-shadow-sm">
                {formatDate(article.publishedAt)}
              </span>
            </div>
          </div>
        </div>
        {article.image.url && (
          <div className="w-full lg:flex-1 h-64 md:h-80 relative">
            <Image
              src={article.image.url}
              alt="Article Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-10">
        <div className="w-full lg:flex-[2]">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-lg -m-4"
              style={{
                backgroundColor: "var(--content-bg, #ef4444)",
              }}
            ></div>
            <div
              className="prose prose-lg max-w-none relative z-10 p-6"
              style={{
                color: "var(--content-text, white)",
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
          {/* <div className="mt-10 min-h-[200px]"> */}
          {/* <Comments postSlug={slug} /> */}
          {/* This space is reserved for the comments component */}
          {/* </div> */}
        </div>

        <div className="w-full lg:flex-1">
          <Menu layout="article" />
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
