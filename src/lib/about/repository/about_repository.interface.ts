import { AboutPageData } from "@/lib/about/model/about_data";

export interface AboutRepository {
  getAboutData(): Promise<AboutPageData>;
}