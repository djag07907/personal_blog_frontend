"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/article/model/article_data";
import { getArticles } from "@/lib/article/service/article_service";
import { emptyArray } from "@/lib/constants/constants";
import Card from "@/lib/commons/cards/card";
import Pagination from "@/lib/commons/pagination/pagination";
import SearchBar from "@/lib/commons/filters/search_bar";
import CategoryFilter from "@/lib/commons/filters/category_filter";
import SortFilter, { SortOption } from "@/lib/commons/filters/sort_filter";
import { useLoading } from "@/lib/commons/context/loading_context";

const POST_PER_PAGE = 6;

function PostsPageContent() {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  const [articles, setArticles] = useState<Article[]>(emptyArray);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  // Fetch articles ONCE on mount (service handles caching)
  useEffect(() => {
    const fetchArticles = async () => {
      showLoader("Loading posts");
      setError(null);
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setError("Failed to load posts. Please try again.");
      } finally {
        hideLoader();
      }
    };
    fetchArticles();
  }, []); // Empty dependency array - run only once on mount

  const updateUrl = useCallback(
    (
      newCategory: string,
      newSearch: string,
      newSort: SortOption,
      newPage: number
    ) => {
      const params = new URLSearchParams();
      if (newCategory) params.set("category", newCategory);
      if (newSearch) params.set("search", newSearch);
      if (newSort !== "newest") params.set("sort", newSort);
      if (newPage > 1) params.set("page", newPage.toString());

      const queryString = params.toString();
      const newUrl = queryString ? `/posts?${queryString}` : "/posts";
      router.replace(newUrl, { scroll: false });
    },
    [router]
  );

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = [...articles];

    if (selectedCategory) {
      filtered = filtered.filter((article) => {
        const articleCategory = article.category;
        if (!articleCategory) {
          return false;
        }

        const normalizedArticleCategory = articleCategory.toLowerCase().trim();
        const normalizedSelectedCategory = selectedCategory
          .toLowerCase()
          .trim();

        return normalizedArticleCategory === normalizedSelectedCategory;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
      );
    }

    filtered.sort((firstArticle, secondArticle) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(secondArticle.publishedAt || "").getTime() -
            new Date(firstArticle.publishedAt || "").getTime()
          );
        case "oldest":
          return (
            new Date(firstArticle.publishedAt || "").getTime() -
            new Date(secondArticle.publishedAt || "").getTime()
          );
        case "title-asc":
          return firstArticle.title.localeCompare(secondArticle.title);
        case "title-desc":
          return secondArticle.title.localeCompare(firstArticle.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, selectedCategory, searchQuery, sortBy]);

  const totalArticles = filteredAndSortedArticles.length;
  const totalPages = Math.ceil(totalArticles / POST_PER_PAGE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const paginatedArticles = filteredAndSortedArticles.slice(
    POST_PER_PAGE * (page - 1),
    POST_PER_PAGE * page
  );

  const transformedArticles = paginatedArticles.map(
    (article, articleIndex) => ({
      id: String(article.id ?? articleIndex),
      title: article.title,
      desc: article.description,
      slug: article.slug,
      createdAt: article.publishedAt ?? new Date().toISOString(),
      catSlug: article.category ?? "General",
      img: article.image?.url ?? "",
    })
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setPage(1);
      updateUrl(category, searchQuery, sortBy, 1);
    },
    [updateUrl, searchQuery, sortBy]
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      setSearchQuery(search);
      setPage(1);
      updateUrl(selectedCategory, search, sortBy, 1);
    },
    [updateUrl, selectedCategory, sortBy]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortBy(sort);
      setPage(1);
      updateUrl(selectedCategory, searchQuery, sort, 1);
    },
    [updateUrl, selectedCategory, searchQuery]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateUrl(selectedCategory, searchQuery, sortBy, newPage);
    },
    [updateUrl, selectedCategory, searchQuery, sortBy]
  );

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSortBy("newest");
    setPage(1);
    router.replace("/posts");
  };

  return (
    <main
      className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 pt-20"
      style={{
        backgroundColor: "var(--content-bg)",
        color: "var(--content-text)",
      }}
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Posts</h1>
        <p className="opacity-75 text-lg">
          Discover all {articles.length} posts from my blog
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search posts by title or content..."
            />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <SortFilter sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
          {(selectedCategory || searchQuery || sortBy !== "newest") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--content-text-muted, #9ca3af)",
                color: "var(--content-bg)",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm opacity-75 gap-2">
          <div>
            Showing {paginatedArticles.length} of {totalArticles} posts
            {selectedCategory && (
              <span> in category &quot;{selectedCategory}&quot;</span>
            )}
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
          </div>
          {totalPages > 1 && (
            <div>
              Page {page} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : totalArticles === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg opacity-75 mb-4">
            No posts found matching your criteria
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show All Posts
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {transformedArticles.map((articleItem) => (
              <Card key={articleItem.id} item={articleItem} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                page={page}
                hasPrev={hasPrev}
                hasNext={hasNext}
                setPage={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Debug Toggle (remove in production) */}
      {/* <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-600">
        <button
          onClick={() => setUseMockData((prev) => !prev)}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors opacity-50"
        >
          {useMockData ? "Use Real Data" : "Use Mock Data"}
        </button>
      </div> */}
    </main>
  );
}

export default PostsPageContent;
