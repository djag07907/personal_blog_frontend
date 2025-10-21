import { Article } from "@/lib/article/model/article_data";
import { getArticles } from "./article_service";

interface CacheState {
  articles: Article[] | null;
  lastFetchTime: number;
  error: string | null;
}

const CACHE_DURATION = 30000; // 30 seconds

class GlobalArticleCache {
  private cache: CacheState = {
    articles: null,
    lastFetchTime: 0,
    error: null,
  };

  private fetchPromise: Promise<Article[]> | null = null;

  async getArticles(): Promise<Article[]> {
    const now = Date.now();

    if (
      this.cache.articles &&
      now - this.cache.lastFetchTime < CACHE_DURATION
    ) {
      return this.cache.articles;
    }

    // If already fetching, return the same promise
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // Perform fetch and store the promise
    this.fetchPromise = this.performFetch();

    try {
      const articles = await this.fetchPromise;
      return articles;
    } finally {
      this.fetchPromise = null;
    }
  }

  private async performFetch(): Promise<Article[]> {
    try {
      const articles = await getArticles();
      this.cache.articles = articles;
      this.cache.lastFetchTime = Date.now();
      this.cache.error = null;
      return articles;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.cache.error = errorMessage;
      console.error("Failed to fetch articles:", error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache = {
      articles: null,
      lastFetchTime: 0,
      error: null,
    };
    this.fetchPromise = null;
  }

  getError(): string | null {
    return this.cache.error;
  }
}

export const globalArticleCache = new GlobalArticleCache();
