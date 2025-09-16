export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
  };
  color?: string;
  // Keep these for backward compatibility
  title?: string;
  img?: string;
}
