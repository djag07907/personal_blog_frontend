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
  editorPick: boolean;
  publishedAt: string;
  category: string;
}
