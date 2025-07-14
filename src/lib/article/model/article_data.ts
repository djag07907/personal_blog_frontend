export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  image: {
    url: string;
  };
  publishedAt: string;
  category: string;
}
