"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Article } from "@/lib/article/model/article_data";
import { mockArticles } from "@/lib/article/model/mock_articles";
import { getArticles } from "@/lib/article/service/article_service";
import { emptyArray } from "@/lib/constants/constants";
import Card from "@/lib/commons/cards/card";
import Pagination from "@/lib/commons/pagination/pagination";
import SearchBar from "@/lib/commons/filters/search_bar";
import CategoryFilter from "@/lib/commons/filters/category_filter";
import SortFilter, { SortOption } from "@/lib/commons/filters/sort_filter";

const POST_PER_PAGE = 6;

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[]>(emptyArray);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const category = searchParams?.get("category") || "";
    const search = searchParams?.get("search") || "";
    const sort = (searchParams?.get("sort") as SortOption) || "newest";
    const pageParam = parseInt(searchParams?.get("page") || "1", 10);

    setSelectedCategory(category);
    setSearchQuery(search);
    setSortBy(sort);
    setPage(Math.max(1, pageParam));
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (useMockData) {
        setArticles(mockArticles);
        setLoading(false);
        setError(null);
      } else {
        setLoading(true);
        setError(null);
        try {
          const fetchedArticles = await getArticles();
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Failed to fetch articles:", error);
          setError("Failed to load posts. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchArticles();
  }, [useMockData]);

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
      filtered = filtered.filter(
        (article) =>
          article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    updateUrl(category, searchQuery, sortBy, 1);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setPage(1);
    updateUrl(selectedCategory, search, sortBy, 1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setPage(1);
    updateUrl(selectedCategory, searchQuery, sort, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(selectedCategory, searchQuery, sortBy, newPage);
  };

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

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm opacity-75 gap-2">
          <div>
            Showing {paginatedArticles.length} of {totalArticles} posts
            {selectedCategory && <span> in category "{selectedCategory}"</span>}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          {totalPages > 1 && (
            <div>
              Page {page} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto opacity-50"></div>
          <p className="mt-4 opacity-75">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => setUseMockData(false)}
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
      <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-600">
        <button
          onClick={() => setUseMockData((prev) => !prev)}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors opacity-50"
        >
          {useMockData ? "Use Real Data" : "Use Mock Data"}
        </button>
      </div>
    </main>
  );
}
