export function useFilteredArticles(articles: any[], query: string) {
  return articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );
}
