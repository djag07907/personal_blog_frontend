import { Metadata } from "next";
import { Article } from "@/lib/article/model/article_data";

export function generateArticleMetadata(
  article: Article,
  baseUrl: string
): Metadata {
  const url = `${baseUrl}/posts/${article.slug}`;
  const imageUrl = article.image.url.startsWith("http")
    ? article.image.url
    : `${baseUrl}${article.image.url}`;

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      url: url,
      title: article.title,
      description: article.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: "Daniel Alvarez Blog",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
      creator: `@${article.author.replace(/\s+/g, "")}`,
    },
    alternates: {
      canonical: url,
    },
  };
}
