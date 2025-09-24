import { ContactPageData } from "@/lib/contact/model/contact_data";
import { ContactRepository } from "@/lib/contact/repository/contact_repository.interface";
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

interface StrapiContactApiResponse {
  data: {
    id: number;
    documentId?: string;
    title: string;
    description: string;
    content: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    publishedAt: string;
    image?: StrapiMediaObject;
  };
}

export class StrapiContactRepository implements ContactRepository {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = `${baseUrl}api/contact`;
  }

  async getContactData(): Promise<ContactPageData> {
    try {
      const response = await fetch(`${this.apiUrl}?populate=image`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiContactApiResponse = await response.json();
      return this.mapToContactData(data.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
      throw error;
    }
  }

  private mapToContactData(
    item: StrapiContactApiResponse["data"]
  ): ContactPageData {
    return {
      id: item.id,
      title: item.title ?? "Contact",
      description: item.description ?? emptyString,
      content: item.content ?? emptyString,
      contactInfo: {
        id: item.id,
        title: item.title ?? "Contact",
        description: item.description ?? emptyString,
        email: item.email ?? emptyString,
        phone: item.phone,
        address: item.address,
        socialLinks: {
          linkedin: item.linkedin,
          github: item.github,
          twitter: item.twitter,
          instagram: item.instagram,
        },
        image: {
          url: item.image?.url
            ? `${baseUrl.replace(/\/$/, "")}${item.image.url}`
            : emptyString,
        },
        publishedAt: item.publishedAt,
      },
      publishedAt: item.publishedAt ?? new Date().toISOString(),
    };
  }
}
