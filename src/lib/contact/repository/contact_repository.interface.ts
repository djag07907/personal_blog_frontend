import { ContactPageData } from "@/lib/contact/model/contact_data";

export interface ContactRepository {
  getContactData(): Promise<ContactPageData>;
}
