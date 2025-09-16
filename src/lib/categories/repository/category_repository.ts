import { Category } from "@/lib/categories/model/categories_data";
import { CategoryRepository } from "@/lib/categories/repository/category_repository.interface";
import { baseUrl } from "@/lib/constants/api_constants";
import { emptyString } from "@/lib/constants/constants";

interface StrapiMediaObject {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface StrapiCategoryApiResponse {
  data: Array<{
    id: number;
    documentId?: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    image?: StrapiMediaObject;
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

export class StrapiCategoryRepository implements CategoryRepository {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = `${baseUrl}api/categories`;
  }

  async getAll(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.apiUrl}?populate=image`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiCategoryApiResponse = await response.json();
      return data.data.map((item) => this.mapToCategory(item));
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw error;
    }
  }

  async getBySlug(slug: string): Promise<Category | null> {
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

      const data: StrapiCategoryApiResponse = await response.json();
      const category = data.data[0];
      return category ? this.mapToCategory(category) : null;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      throw error;
    }
  }

  private mapToCategory(item: StrapiCategoryApiResponse["data"][number]): Category {
    return {
      id: item.id,
      name: item.name ?? emptyString,
      slug: item.slug ?? emptyString,
      description: item.description ?? emptyString,
      color: item.color ?? "#000000",
      image: {
        url: item.image?.url
          ? `${baseUrl.replace(/\/$/, "")}${item.image.url}`
          : emptyString,
      },
      // Backward compatibility
      title: item.name ?? emptyString,
      img: item.image?.url
        ? `${baseUrl.replace(/\/$/, "")}${item.image.url}`
        : emptyString,
    };
  }
}