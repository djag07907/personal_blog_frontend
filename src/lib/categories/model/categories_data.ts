export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
  };
  color?: string;
  title?: string;
  img?: string;
}
