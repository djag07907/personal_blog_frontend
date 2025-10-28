"use client";

import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { getArticleBySlug } from "@/lib/article/service/article_service";
import Menu from "@/lib/commons/menu/menu";
import { formatDate } from "@/lib/commons/utils/date_format";
import Image from "next/image";
import { useEffect, useState, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { ThemeContext } from "@/lib/commons/context/theme_context";
import { SocialShare } from "@/components/SocialShare";
import "highlight.js/styles/github-dark.css";
interface SinglePageProps {
  params: Promise<{
    slug: string;
  }>;
}
const SinglePage = ({ params }: SinglePageProps) => {
  const { theme } = useContext(ThemeContext);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRealArticle, setIsRealArticle] = useState(false);
  const codeBlockIdsRef = useRef<Map<string, string>>(new Map());
  const codeBlockCounterRef = useRef(0);
  const hasFetchedRef = useRef(false);

  const copyToClipboard = (code: string, id: string) => {
    if (!code || code.trim().length === 0) {
      console.warn("No code to copy");
      return;
    }
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const extractCodeText = (children: unknown): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map(extractCodeText).join("");
    }
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      (children as Record<string, unknown>).props
    ) {
      const props = (children as Record<string, unknown>).props as Record<
        string,
        unknown
      >;
      if ("children" in props) {
        return extractCodeText(props.children);
      }
    }
    return "";
  };

  const getCodeBlockId = (codeContent: string): string => {
    const hash = codeContent
      .split("")
      .reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)
      .toString(36);
    const id = `code-block-${hash}`;
    return id;
  };

  const hashCode = (str: string): string => {
    const hash = str
      .split("")
      .reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)
      .toString(36);
    return hash;
  };

  const textToSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();
  };

  const getTextContent = (children: unknown): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map(getTextContent).join("");
    }
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      (children as Record<string, unknown>).props &&
      typeof (children as Record<string, unknown>).props === "object" &&
      "children" in
        ((children as Record<string, unknown>).props as Record<string, unknown>)
    ) {
      return getTextContent(
        ((children as Record<string, unknown>).props as Record<string, unknown>)
          .children
      );
    }
    return "";
  };

  const isDark = theme === "dark";
  const mdStyles = {
    code: {
      inline: isDark
        ? "bg-gray-700 px-1.5 py-0.5 rounded text-sm text-orange-300"
        : "bg-gray-100 px-1.5 py-0.5 rounded text-sm text-orange-600",
    },
    table: {
      border: isDark ? "border-gray-600" : "border-gray-300",
      headerBg: isDark ? "bg-gray-700" : "bg-gray-50",
      headerText: isDark ? "text-white" : "text-gray-900",
    },
    blockquote: {
      bg: isDark ? "bg-gray-800" : "bg-blue-50",
      border: isDark ? "border-blue-400" : "border-blue-500",
      text: isDark ? "text-gray-300" : "text-gray-800",
    },
    hr: isDark ? "border-gray-600" : "border-gray-300",
  };

  useEffect(() => {
    const fetchArticle = async () => {
      // Prevent double fetch in React Strict Mode
      if (hasFetchedRef.current) {
        return;
      }
      hasFetchedRef.current = true;

      try {
        const { slug } = await params;
        setLoading(true);

        let data = await getArticleBySlug(slug);
        let fromRealAPI = false;

        if (data) {
          fromRealAPI = true;
        } else {
          data = mockArticles.find((article) => article.slug === slug) || null;
        }

        const finalArticle = data || {
          id: 0,
          title: "Article Not Found",
          author: "Unknown",
          authorImage: { url: "" },
          description: "No description available.",
          content: "<p>No content available.</p>",
          image: { url: "" },
          publishedAt: "",
          category: "General",
          slug: slug,
          editorPick: false,
        };

        setArticle(finalArticle);
        setIsRealArticle(fromRealAPI);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params]);

  // Handle hash navigation for table of contents
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    // Scroll on initial load if hash exists
    if (typeof window !== "undefined") {
      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [article]); // Re-run when article loads
  if (loading) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-muted">Loading article...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto p-4 pt-28">
        <div className="text-center py-8">
          <p className="text-muted text-xl">Article not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-28">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
        <div className="w-full lg:flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-12 h-12 relative">
              <Image
                src={article.authorImage?.url || "/profile.png"}
                alt="Author Avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{article.author}</span>
              <span className="text-muted">
                {formatDate(article.publishedAt)}
              </span>
            </div>
          </div>
        </div>
        {article.image.url && (
          <div className="w-full lg:flex-1 h-64 md:h-80 relative">
            <Image
              src={article.image.url}
              alt="Article Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
      {/* Social Share Component - Only for real articles */}
      {isRealArticle && (
        <div className="mt-8">
          <SocialShare
            url={typeof window !== "undefined" ? window.location.href : ""}
            title={article.title}
            description={article.description}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-10">
        <div className="w-full lg:flex-[2]">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-lg -m-4"
              style={{
                backgroundColor: "var(--content-bg, #ef4444)",
              }}
            ></div>
            <div
              className="prose prose-lg max-w-none relative z-10 p-6"
              style={{
                color: "var(--content-text, white)",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkHeadingId]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  pre: ({ children, ...props }) => {
                    const codeText = extractCodeText(children);

                    const blockId = getCodeBlockId(codeText);
                    const isCopied = copiedId === blockId;

                    return (
                      <div className="relative group">
                        <pre
                          {...props}
                          className={`${
                            isDark ? "bg-gray-800" : "bg-gray-100"
                          } ${
                            isDark ? "text-white" : "text-gray-900"
                          } p-4 rounded-lg overflow-x-auto`}
                        >
                          {children}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(codeText, blockId)}
                          className={`absolute top-2 right-2 px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
                            isCopied
                              ? isDark
                                ? "bg-green-600 text-white"
                                : "bg-green-500 text-white"
                              : isDark
                              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                          }`}
                          title="Copy code to clipboard"
                        >
                          {isCopied ? "✓ Copied!" : "Copy"}
                        </button>
                      </div>
                    );
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  code: ({ children, ...props }: any) => {
                    const inline = !props.className?.includes("hljs");
                    return (
                      <code
                        {...props}
                        className={
                          inline ? mdStyles.code.inline : props.className
                        }
                      >
                        {children}
                      </code>
                    );
                  },
                  table: ({ children, ...props }) => (
                    <table
                      {...props}
                      className={`border-collapse border ${mdStyles.table.border} w-full my-4`}
                    >
                      {children}
                    </table>
                  ),
                  th: ({ children, ...props }) => (
                    <th
                      {...props}
                      className={`border ${mdStyles.table.border} p-2 ${mdStyles.table.headerBg} font-semibold text-left ${mdStyles.table.headerText}`}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td
                      {...props}
                      className={`border ${mdStyles.table.border} p-2 ${
                        isDark ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      {children}
                    </td>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      {...props}
                      className={`border-l-4 ${mdStyles.blockquote.border} pl-4 italic my-4 ${mdStyles.blockquote.bg} ${mdStyles.blockquote.text} p-3 rounded-r`}
                    >
                      {children}
                    </blockquote>
                  ),
                  hr: (props) => (
                    <hr {...props} className={`my-6 ${mdStyles.hr}`} />
                  ),
                  h1: ({ children, ...props }) => {
                    const id = textToSlug(getTextContent(children));
                    return (
                      <h1
                        {...props}
                        id={id}
                        className={`text-3xl font-bold my-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children, ...props }) => {
                    const id = textToSlug(getTextContent(children));
                    return (
                      <h2
                        {...props}
                        id={id}
                        className={`text-2xl font-bold my-3 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const id = textToSlug(getTextContent(children));
                    return (
                      <h3
                        {...props}
                        id={id}
                        className={`text-xl font-bold my-2 ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {children}
                      </h3>
                    );
                  },
                  ul: ({ children, ...props }) => (
                    <ul
                      {...props}
                      className={`list-disc list-inside my-3 ${
                        isDark ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol
                      {...props}
                      className={`list-decimal list-inside my-3 ${
                        isDark ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li {...props} className="my-1">
                      {children}
                    </li>
                  ),
                  p: ({ children, ...props }) => (
                    <p
                      {...props}
                      className={`my-3 leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-800"
                      }`}
                    >
                      {children}
                    </p>
                  ),
                  a: ({ children, ...props }) => (
                    <a
                      {...props}
                      className={`${
                        isDark
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-800"
                      } underline`}
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children, ...props }) => (
                    <strong
                      {...props}
                      className={`font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {children}
                    </strong>
                  ),
                  em: ({ children, ...props }) => (
                    <em
                      {...props}
                      className={`italic ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {children}
                    </em>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
          {/* <div className="mt-10 min-h-[200px]"> */}
          {/* <Comments postSlug={slug} /> */}
          {/* This space is reserved for the comments component */}
          {/* </div> */}
        </div>

        <div className="w-full lg:flex-1">
          <Menu layout="article" />
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
