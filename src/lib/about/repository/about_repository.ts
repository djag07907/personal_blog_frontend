import { AboutPageData } from "@/lib/about/model/about_data";
import { AboutRepository } from "@/lib/about/repository/about_repository.interface";
import { baseUrl } from "@/lib/constants/api_constants";
import { emptyString } from "@/lib/constants/constants";

interface StrapiAboutApiResponse {
  data: {
    id: number;
    documentId?: string;
    title: string;
    description: string;
    content: string;
    skills?: string[];
    publishedAt: string;
    image?: {
      id: number;
      name: string;
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
    experience?: Array<{
      id: number;
      company: string;
      position: string;
      startDate: string;
      endDate?: string;
      description: string;
      current: boolean;
    }>;
    education?: Array<{
      id: number;
      institution: string;
      degree: string;
      startDate: string;
      endDate?: string;
      description?: string;
    }>;
    achievements?: Array<{
      id: number;
      title: string;
      description: string;
      date: string;
    }>;
  };
}

export class StrapiAboutRepository implements AboutRepository {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = `${baseUrl}api/about`;
  }

  async getAboutData(): Promise<AboutPageData> {
    try {
      let response = await fetch(
        `${this.apiUrl}?populate[image]=*&populate[experience]=*&populate[education]=*&populate[achievements]=*`,
        {
          cache: "no-store",
        }
      );

      // If 400 error, try simpler populate syntax
      if (response.status === 400) {
        console.warn("Component populate failed, trying simpler syntax");
        response = await fetch(`${this.apiUrl}?populate=*`, {
          cache: "no-store",
        });
      }

      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 404) {
          console.warn(
            "About content not found in Strapi - will use fallback data"
          );
          throw new Error("About content not found");
        }
        if (response.status === 400) {
          console.warn(
            "Bad request to Strapi API - possibly component structure issue"
          );
          throw new Error("Invalid API request");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiAboutApiResponse = await response.json();

      // Handle case where data is null (no content created yet)
      if (!data.data) {
        console.warn("About data is null - no content created in Strapi yet");
        throw new Error("No about content available");
      }

      return this.mapToAboutData(data.data);
    } catch (error) {
      console.error("Error fetching about data:", error);
      throw error;
    }
  }

  private mapToAboutData(item: StrapiAboutApiResponse["data"]): AboutPageData {
    return {
      id: item.id,
      title: item.title ?? "About",
      description: item.description ?? emptyString,
      content: item.content ?? emptyString,
      image: {
        url: item.image?.url
          ? `${baseUrl.replace(/\/$/, "")}${item.image.url}`
          : emptyString,
      },
      skills: item.skills ?? [],
      experience: item.experience ?? [],
      education: item.education ?? [],
      achievements: item.achievements ?? [],
      publishedAt: item.publishedAt ?? new Date().toISOString(),
    };
  }
}
