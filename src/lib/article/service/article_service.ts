import { Article } from "@/lib/article/model/article_data";
import { ArticleRepository } from "@/lib/article/repository/article_repository.interface";
import { StrapiArticleRepository } from "@/lib/article/repository/article_repository";

export class ArticleService {
  private repository: ArticleRepository;

  constructor(repository?: ArticleRepository) {
    this.repository = repository ?? new StrapiArticleRepository();
  }

  async getAllArticles(): Promise<Article[]> {
    try {
      const articles = await this.repository.getAll();
      console.log("Fetched articles from service:", articles);
      return articles;
    } catch (error) {
      console.error("ArticleService: Error fetching all articles:", error);
      return [];
    }
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
      console.log("Fetched editor's pick articles from service:", articles);
      return articles;
    } catch (error) {
      console.error("ArticleService: Error fetching editor's pick articles:", error);
      return [];
    }
  }
}

const defaultArticleService = new ArticleService();

export const getArticles = () => defaultArticleService.getAllArticles();
export const getArticleBySlug = (slug: string) =>
  defaultArticleService.getArticleBySlug(slug);
export const getEditorsPickArticles = () => 
  defaultArticleService.getEditorsPickArticles();
