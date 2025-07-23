export interface Article {
  id: number;
  author: string;
  authorImage: { url: string };
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
