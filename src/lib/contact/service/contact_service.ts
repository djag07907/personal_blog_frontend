import { ContactPageData } from "@/lib/contact/model/contact_data";
import { ContactRepository } from "@/lib/contact/repository/contact_repository.interface";
import { StrapiContactRepository } from "@/lib/contact/repository/contact_repository";

export class ContactService {
  private repository: ContactRepository;

  constructor(repository?: ContactRepository) {
    this.repository = repository ?? new StrapiContactRepository();
  }

  async getContactData(): Promise<ContactPageData | null> {
    try {
      const contactData = await this.repository.getContactData();
      console.log("Fetched contact data from service:", contactData);
      return contactData;
    } catch (error) {
      console.error("ContactService: Error fetching contact data:", error);
      return null;
    }
  }
}

const defaultContactService = new ContactService();

export const getContactData = () => defaultContactService.getContactData();
