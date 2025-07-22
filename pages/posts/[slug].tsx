import SinglePage from "@/lib/article/[slug]/page";
import { GetStaticPaths, GetStaticProps } from "next";
import { mockArticles } from "@/lib/article/model/mock_articles";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  return {
    props: {
      params: { slug },
    },
  };
};

export default SinglePage;
