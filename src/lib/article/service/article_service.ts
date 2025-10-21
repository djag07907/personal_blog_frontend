import { Article } from "@/lib/article/model/article_data";
import { ArticleRepository } from "@/lib/article/repository/article_repository.interface";
import { StrapiArticleRepository } from "@/lib/article/repository/article_repository";

export class ArticleService {
  private repository: ArticleRepository;
  private articlesCache: Article[] | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(repository?: ArticleRepository) {
    this.repository = repository ?? new StrapiArticleRepository();
  }

  async getAllArticles(): Promise<Article[]> {
    try {
      const now = Date.now();

      if (
        this.articlesCache &&
        now - this.lastFetchTime < this.CACHE_DURATION
      ) {
        return this.articlesCache;
      }

      const articles = await this.repository.getAll();
      this.articlesCache = articles;
      this.lastFetchTime = now;
      return articles;
    } catch (error) {
      console.error("[ArticleService] Error fetching all articles:", error);
      return this.articlesCache || [];
    }
  }

  clearCache(): void {
    this.articlesCache = null;
    this.lastFetchTime = 0;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      return await this.repository.getBySlug(slug);
    } catch (error) {
      console.error("ArticleService: Error fetching article by slug:", error);
      return null;
    }
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    try {
      return await this.repository.getByCategory(category);
    } catch (error) {
      console.error(
        "ArticleService: Error fetching articles by category:",
        error
      );
      return [];
    }
  }

  async getPaginatedArticles(
    page: number,
    limit: number
  ): Promise<{ articles: Article[]; total: number }> {
    try {
      return await this.repository.getPaginated(page, limit);
    } catch (error) {
      console.error(
        "ArticleService: Error fetching paginated articles:",
        error
      );
      return { articles: [], total: 0 };
    }
  }

  async getEditorsPickArticles(): Promise<Article[]> {
    try {
      const articles = await this.repository.getEditorsPick();
      return articles;
    } catch (error) {
      console.error(
        "ArticleService: Error fetching editor's pick articles:",
        error
      );
      return [];
    }
  }

  async getMostPopularArticles(limit: number = 10): Promise<Article[]> {
    try {
      const articles = await this.repository.getMostPopular(limit);
      return articles;
    } catch (error) {
      console.error(
        "ArticleService: Error fetching most popular articles:",
        error
      );
      return [];
    }
  }

  async incrementArticleViews(slug: string): Promise<void> {
    try {
      await this.repository.incrementViews(slug);
    } catch (error) {
      console.error("ArticleService: Error incrementing article views:", error);
    }
  }
}

const defaultArticleService = new ArticleService();

export const getArticles = () => defaultArticleService.getAllArticles();
export const getArticleBySlug = (slug: string) =>
  defaultArticleService.getArticleBySlug(slug);
export const getEditorsPickArticles = () =>
  defaultArticleService.getEditorsPickArticles();
export const getMostPopularArticles = (limit?: number) =>
  defaultArticleService.getMostPopularArticles(limit);
export const incrementArticleViews = (slug: string) =>
  defaultArticleService.incrementArticleViews(slug);
