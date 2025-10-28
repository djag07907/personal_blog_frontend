import { mockArticles } from "@/lib/article/model/mock_articles";
import {
  getArticles,
  getArticleBySlug,
} from "@/lib/article/service/article_service";
import SinglePage from "@/lib/article/[slug]/page";
import { generateArticleMetadata } from "@/lib/article/[slug]/metadata";
import { Metadata } from "next";

// Generate metadata for social sharing
export async function generateMetadata({
  params,
}: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://blog.danielalvarez-dev.com";

  try {
    let article = await getArticleBySlug(slug);

    if (!article) {
      article = mockArticles.find((a) => a.slug === slug) || null;
    }

    if (article) {
      return generateArticleMetadata(article, baseUrl);
    }
  } catch (error) {
    console.warn("Failed to generate metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Article Not Found",
    description: "The requested article could not be found.",
  };
}

export async function generateStaticParams() {
  try {
    const realArticles = await getArticles();
    if (realArticles && realArticles.length > 0) {
      return realArticles.map((article) => ({
        slug: article.slug,
      }));
    }
  } catch (error) {
    console.warn(
      "Failed to fetch real articles for static generation, using mock data:",
      error
    );
  }

  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

interface RoutePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const RoutePage = async ({ params }: RoutePageProps) => {
  return <SinglePage params={params} />;
};

export default RoutePage;
