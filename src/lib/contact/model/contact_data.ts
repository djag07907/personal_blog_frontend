export interface ContactInfo {
  id: number;
  title: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  image?: {
    url: string;
  };
  publishedAt?: string;
}

export interface ContactFormField {
  id: number;
  fieldName: string;
  fieldType: "text" | "email" | "textarea" | "tel";
  placeholder?: string;
  required: boolean;
  order: number;
}

export interface ContactPageData {
  id: number;
  title: string;
  description: string;
  content: string;
  contactInfo: ContactInfo;
  formFields?: ContactFormField[];
  publishedAt: string;
}
