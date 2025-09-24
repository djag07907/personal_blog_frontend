import { GetStaticPaths, GetStaticProps } from "next";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { Article } from "@/lib/article/model/article_data";

interface PostProps {
  article: Article | undefined;
}

const PostPage = ({ article }: PostProps) => {

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const article = mockArticles.find((article) => article.slug === slug);

  return {
    props: {
      article: article || null,
    },
  };
};

export default PostPage;
