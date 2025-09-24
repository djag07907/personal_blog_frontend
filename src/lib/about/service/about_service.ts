import { AboutPageData } from "@/lib/about/model/about_data";
import { AboutRepository } from "@/lib/about/repository/about_repository.interface";
import { StrapiAboutRepository } from "@/lib/about/repository/about_repository";

export class AboutService {
  private repository: AboutRepository;

  constructor(repository?: AboutRepository) {
    this.repository = repository ?? new StrapiAboutRepository();
  }

  async getAboutData(): Promise<AboutPageData | null> {
    try {
      const aboutData = await this.repository.getAboutData();
      console.log("Fetched about data from service:", aboutData);
      return aboutData;
    } catch (error) {
      console.error("AboutService: Error fetching about data:", error);
      return null;
    }
  }
}

const defaultAboutService = new AboutService();

export const getAboutData = () => defaultAboutService.getAboutData();