import { API_BASE_URL, API_ENDPOINTS } from "@config/apiConfig";
import dataFetcher from "@utils/dataFetcher";

export const CategoriesApi = {
  getCategories: async () => {
    try {
      const url =
        typeof window === "undefined"
          ? `${API_BASE_URL}${API_ENDPOINTS.CATEGORIES.LIST}`
          : "/api/products/categories";
      return await dataFetcher.get(url);
    } catch (error) {
      return { status: false, error: error.message };
    }
  },
};
