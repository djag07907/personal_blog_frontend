import { Article } from "@/lib/article/model/article_data";
import { ArticleRepository } from "@/lib/article/repository/article_repository.interface";
import { baseUrl } from "@/lib/constants/api_constants";
import { emptyString } from "@/lib/constants/constants";

interface StrapiApiResponse {
  data: Array<{
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
    publishedAt: string;
    category?: string;
    author?: string;
    authorImage?: {
      url: string;
    };
    image?: {
      id: number;
      name: string;
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
  }>;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export class StrapiArticleRepository implements ArticleRepository {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = `${baseUrl}api/articles`;
  }

  async getAll(): Promise<Article[]> {
    try {
      const response = await fetch(`${this.apiUrl}?populate=image`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiApiResponse = await response.json();
      return data.data.map((item) => this.mapToArticle(item));
    } catch (error) {
      console.error("Error fetching all articles:", error);
      throw error;
    }
  }

  async getBySlug(slug: string): Promise<Article | null> {
    try {
      const response = await fetch(
        `${this.apiUrl}?filters[slug][$eq]=${slug}&populate=image`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiApiResponse = await response.json();
      const article = data.data[0];
      return article ? this.mapToArticle(article) : null;
    } catch (error) {
      console.error("Error fetching article by slug:", error);
      throw error;
    }
  }

  async getByCategory(category: string): Promise<Article[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}?filters[category][$eq]=${category}&populate=image`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiApiResponse = await response.json();
      return data.data.map((item) => this.mapToArticle(item));
    } catch (error) {
      console.error("Error fetching articles by category:", error);
      throw error;
    }
  }

  async getPaginated(
    page: number,
    limit: number
  ): Promise<{ articles: Article[]; total: number }> {
    try {
      const response = await fetch(
        `${this.apiUrl}?populate=image&pagination[page]=${page}&pagination[pageSize]=${limit}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiApiResponse = await response.json();
      return {
        articles: data.data.map((item) => this.mapToArticle(item)),
        total: data.meta?.pagination?.total ?? 0,
      };
    } catch (error) {
      console.error("Error fetching paginated articles:", error);
      throw error;
    }
  }

  private mapToArticle(item: StrapiApiResponse["data"][number]): Article {
    return {
      id: item.id,
      title: item.title ?? "missing title",
      description: item.description ?? emptyString,
      content: item.content ?? emptyString,
      slug: item.slug ?? emptyString,
      publishedAt: item.publishedAt ?? new Date().toISOString(),
      category: item.category ?? emptyString,
      author: item.author ?? emptyString,
      authorImage: {
        url: item.authorImage?.url ?? emptyString,
      },
      image: {
        url: item.image?.url
          ? `${baseUrl.replace(/\/$/, "")}${item.image.url}`
          : emptyString,
      },
    };
  }
}
