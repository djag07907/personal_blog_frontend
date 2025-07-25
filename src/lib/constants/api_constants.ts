// const baseUrl = "https://sincere-wisdom-8c843dc61b.strapiapp.com/";
const baseUrl = "http://localhost:1337/";

const api_endpoints = {
  articles: `${baseUrl}api/articles`,
  categories: `${baseUrl}api/categories`,
  tags: `${baseUrl}api/tags`,
  users: `${baseUrl}api/users`,
  auth: `${baseUrl}api/auth/local`,
} as const;
export type ApiEndpoints = typeof api_endpoints;
export { baseUrl, api_endpoints };
