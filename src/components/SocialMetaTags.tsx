import Head from "next/head";

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  publishedAt?: string;
  type?: "article" | "website";
}

export const SocialMetaTags = ({
  title,
  description,
  image,
  url,
  author,
  publishedAt,
  type = "article",
}: SocialMetaTagsProps) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Daniel Alvarez Blog" />

      {type === "article" && publishedAt && (
        <>
          <meta property="article:published_time" content={publishedAt} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={`@${author.replace(/\s+/g, "")}`} />

      {/* LinkedIn */}
      <meta property="og:image:alt" content={title} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
    </Head>
  );
};
