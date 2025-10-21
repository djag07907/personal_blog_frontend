import { Category } from "@/lib/categories/model/categories_data";
import { CategoryRepository } from "@/lib/categories/repository/category_repository.interface";
import { StrapiCategoryRepository } from "@/lib/categories/repository/category_repository";

export class CategoryService {
  private repository: CategoryRepository;
  private categoriesCache: Category[] | null = null;
  private lastFetchTime: number = 0;
  private fetchInProgress: boolean = false;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  constructor(repository?: CategoryRepository) {
    this.repository = repository ?? new StrapiCategoryRepository();
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const now = Date.now();

      if (
        this.categoriesCache &&
        now - this.lastFetchTime < this.CACHE_DURATION
      ) {
        return this.categoriesCache;
      }

      if (this.fetchInProgress) {
        while (this.fetchInProgress) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        return this.categoriesCache || [];
      }

      this.fetchInProgress = true;

      const categories = await this.repository.getAll();

      this.categoriesCache = categories;
      this.lastFetchTime = now;

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    } finally {
      this.fetchInProgress = false;
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      return await this.repository.getBySlug(slug);
    } catch (error) {
      console.error("CategoryService: Error fetching category by slug:", error);
      return null;
    }
  }
}

const defaultCategoryService = new CategoryService();

export const getCategories = () => defaultCategoryService.getAllCategories();
export const getCategoryBySlug = (slug: string) =>
  defaultCategoryService.getCategoryBySlug(slug);
