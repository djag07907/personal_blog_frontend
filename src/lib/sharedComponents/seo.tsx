"use client";
import Head from "next/head";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function SEO({
  title,
  description = "A personal blog about tech, development, and software.",
  image = "/favicon.ico",
  url = "https://www.danielalvarez-dev.com",
}: SEOProps) {
  const fullTitle = `${title} | My Tech Blog`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
