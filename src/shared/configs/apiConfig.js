export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "https://dummyjson.com";

export const API_ENDPOINTS = {
  PRODUCTS: {
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
    CATEGORY: (category) => `/products/category/${category}`,
  },
  CATEGORIES: {
    LIST: "/products/categories",
  },
  CATEGORY: {
    DETAIL: (category) => `/categories/${category}`,
  },
};

export const PRODUCT_PAGE_LIMIT = 8;
export const SHOP_PAGE_LIMIT = 9;
export const CATEGORY_PRODUCT_LIMIT = 50;
