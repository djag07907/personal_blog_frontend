import { mockArticles } from "@/lib/article/model/mock_articles";
import { getArticles } from "@/lib/article/service/article_service";
import SinglePage from "@/lib/article/[slug]/page";

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
