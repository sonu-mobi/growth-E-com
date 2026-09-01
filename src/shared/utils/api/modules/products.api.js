import { API_BASE_URL, API_ENDPOINTS } from "@config/apiConfig";
import dataFetcher from "@utils/dataFetcher";

export const ProductsApi = {
  getProducts: async ({ limit = 8, skip = 0 } = {}) => {
    try {
      const url =
        typeof window === "undefined"
          ? `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.LIST}?limit=${limit}&skip=${skip}`
          : `/api/products?limit=${limit}&skip=${skip}`;
      return await dataFetcher.get(url);
    } catch (error) {
      return { status: false, error: error.message };
    }
  },
  getProduct: async (id) => {
    try {
      const url =
        typeof window === "undefined"
          ? `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.DETAIL(id)}`
          : `/api/products/${id}`;
      return await dataFetcher.get(url);
    } catch (error) {
      return { status: false, error: error.message };
    }
  },
  getProductsByCategory: async (category, { limit = 4, skip = 0 } = {}) => {
    try {
      const url =
        typeof window === "undefined"
          ? `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.CATEGORY(category)}?limit=${limit}&skip=${skip}`
          : `/api/products/category/${category}?limit=${limit}&skip=${skip}`;
      return await dataFetcher.get(url);
    } catch (error) {
      return { status: false, error: error.message };
    }
  },
};
