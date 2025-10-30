import React from "react";

interface StructuredDataProps {
  type?: "Person" | "BlogPosting" | "WebSite";
  data?: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type = "Person",
  data = {},
}) => {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    switch (type) {
      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Daniel Alvarez",
          jobTitle: "Web and Mobile Software Engineer",
          url: baseUrl,
          sameAs: [
            "https://www.linkedin.com/in/djag-dev/",
            "https://github.com/djaG07907",
            "https://instagram.com/dalvarez1ng",
          ],
          ...data,
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Daniel Alvarez Blog",
          url: baseUrl,
          description:
            "Personal tech blog exploring web development, software engineering, and technology",
          author: {
            "@type": "Person",
            name: "Daniel Alvarez",
          },
          ...data,
        };

      case "BlogPosting":
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.title || "Blog Post",
          description: data.description || "",
          author: {
            "@type": "Person",
            name: "Daniel Alvarez",
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          ...data,
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
};
