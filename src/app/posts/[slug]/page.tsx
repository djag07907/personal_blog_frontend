import { mockArticles } from "@/lib/article/model/mock_articles";
import SinglePage from "@/lib/article/[slug]/page";

export async function generateStaticParams() {
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
