import { Article } from "@/lib/article/model/article_data";

export interface ArticleRepository {
  getAll(): Promise<Article[]>;
  getBySlug(slug: string): Promise<Article | null>;
  getByCategory(category: string): Promise<Article[]>;
  getPaginated(page: number, limit: number): Promise<{ articles: Article[]; total: number }>;
  getEditorsPick(): Promise<Article[]>;
}
