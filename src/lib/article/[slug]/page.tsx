import { getArticleBySlug } from "@/lib/article/service/article_service";
import { notFound } from "next/navigation";
// import { useContentProtection } from "@/lib/commons/utils/no_copy";
import SEO from "@/lib/sharedComponents/seo";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <SEO title={article.title} description={article.description} />
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      <img
        src={article.image.url}
        alt={article.title}
        className="w-full mb-8 rounded"
      />
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
