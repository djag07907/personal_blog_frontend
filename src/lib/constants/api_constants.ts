const baseUrl = "https://smart-butterfly-69365734a8.strapiapp.com/";
// const baseUrl = "http://localhost:1337/";

const api_endpoints = {
  articles: `${baseUrl}api/articles`,
  categories: `${baseUrl}api/categories`,
  contact: `${baseUrl}api/contact`,
  about: `${baseUrl}api/about`,
  // tags: `${baseUrl}api/tags`,
  users: `${baseUrl}api/users`,
  auth: `${baseUrl}api/auth/local`,
} as const;
export type ApiEndpoints = typeof api_endpoints;
export { baseUrl, api_endpoints };
