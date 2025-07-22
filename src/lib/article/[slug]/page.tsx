import { mockArticles } from "@/lib/article/model/mock_articles";
import Menu from "@/lib/commons/menu/menu";
import Image from "next/image";
interface SinglePageProps {
  params: Promise<{
    slug: string;
  }>;
}
const SinglePage = async ({ params }: SinglePageProps) => {
  const { slug } = await params;
  const data = mockArticles.find((article) => article.slug === slug) || {
    title: "Article Not Found",
    description: "No description available.",
    content: "<p>No content available.</p>",
    image: { url: "" },
    publishedAt: "",
    category: "General",
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-12 items-center">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-12">{data.title}</h1>
          <div className="flex items-center gap-5 mb-6">
            {data.image.url && (
              <div className="w-12 h-12 relative">
                <Image
                  src={data.image.url}
                  alt="User Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-lg font-medium">Author Name</span>
              <span className="text-gray-500">01.01.2024</span>
            </div>
          </div>
        </div>
        {data.image.url && (
          <div className="flex-1 h-80 relative">
            <Image
              src={data.image.url}
              alt="Article Image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="mt-10">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        {/* <div className="mt-10">
          <Comments postSlug={slug} />
        </div> */}
      </div>
      <Menu />
    </div>
  );
};
export default SinglePage;
