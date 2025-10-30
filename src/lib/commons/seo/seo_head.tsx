import React from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
  description = "Personal tech blog by Daniel Alvarez. Exploring web development, software engineering, and technology. Share insights on React, Next.js, Node.js, Flutter, and modern development practices.",
  keywords = "Daniel Alvarez, software developer, full stack developer, web development, mobile development, Flutter, React, Next.js, Node.js, TypeScript, Strapi, programming, coding",
  ogTitle = "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
  ogDescription = "Personal tech blog exploring web development, software engineering, and technology.",
  ogImage = "/profile.png",
  twitterTitle = "Daniel Alvarez - Web and Mobile Software Engineer & Tech Blog",
  twitterDescription = "Personal tech blog exploring web development, software engineering, and technology.",
  twitterImage = "/profile.png",
  twitterCreator = "@djag_dev",
  canonicalUrl,
}) => {
  return (
    <>
      {/* Page Title */}
      <title>{title}</title>

      {/* Basic Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Daniel Alvarez" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Daniel Alvarez Blog" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Favicon */}
      <link rel="icon" href="/laptop.png" type="image/png" />
      <link rel="apple-touch-icon" href="/laptop.png" />
      <link rel="shortcut icon" href="/laptop.png" />

      {/* Web Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
};

export default SEOHead;
