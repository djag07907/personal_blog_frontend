import { Article } from "@/lib/article/model/article_data";
import { emptyString } from "@/lib/constants/constants";

export async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${baseUrl}/api/articles?populate=image`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map((item: any) => formatArticle(item));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(
    `${baseUrl}/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  const article = json.data[0];
  return article ? formatArticle(article) : null;
}

function formatArticle(item: any): Article {
  return {
    id: item.id,
    title: item.attributes.title,
    description: item.attributes.description,
    content: item.attributes.content,
    slug: item.attributes.slug,
    publishedAt: item.attributes.publishedAt,
    category: item.attributes.category || emptyString,
    image: {
      url: item.attributes.image?.data?.attributes?.url || emptyString,
    },
  };
}
