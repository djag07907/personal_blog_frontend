import { AboutPageData } from "@/lib/about/model/about_data";
import { AboutRepository } from "@/lib/about/repository/about_repository.interface";
import { StrapiAboutRepository } from "@/lib/about/repository/about_repository";
import { mergeWithFallback } from "@/lib/about/utils/fallback_data";

export class AboutService {
  private repository: AboutRepository;

  constructor(repository?: AboutRepository) {
    this.repository = repository ?? new StrapiAboutRepository();
  }

  async getAboutData(): Promise<AboutPageData> {
    try {
      const aboutData = await this.repository.getAboutData();

      return mergeWithFallback(aboutData);
    } catch (error) {
      console.error("AboutService: Error fetching about data:", error);

      return mergeWithFallback(null);
    }
  }
}

const defaultAboutService = new AboutService();

export const getAboutData = (): Promise<AboutPageData> =>
  defaultAboutService.getAboutData();
