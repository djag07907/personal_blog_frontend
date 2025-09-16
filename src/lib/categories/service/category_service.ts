import { Category } from "@/lib/categories/model/categories_data";
import { CategoryRepository } from "@/lib/categories/repository/category_repository.interface";
import { StrapiCategoryRepository } from "@/lib/categories/repository/category_repository";

export class CategoryService {
  private repository: CategoryRepository;

  constructor(repository?: CategoryRepository) {
    this.repository = repository ?? new StrapiCategoryRepository();
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await this.repository.getAll();
      console.log("Fetched categories from service:", categories); // Debug log
      return categories;
    } catch (error) {
      console.error("CategoryService: Error fetching all categories:", error);
      return [];
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

// Create a default instance for backward compatibility
const defaultCategoryService = new CategoryService();

export const getCategories = () => defaultCategoryService.getAllCategories();
export const getCategoryBySlug = (slug: string) =>
  defaultCategoryService.getCategoryBySlug(slug);