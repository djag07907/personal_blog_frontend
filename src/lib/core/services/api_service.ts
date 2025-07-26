const apiService = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
    return response.json() as Promise<T>;
  },
};
export default apiService;
