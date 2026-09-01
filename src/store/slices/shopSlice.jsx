import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsApi } from "@api/modules/products.api";
import { CategoriesApi } from "@api/modules/categorie.api";
import { CATEGORY_PRODUCT_LIMIT, SHOP_PAGE_LIMIT } from "@config/apiConfig";
import { mapProduct } from "./productListSlice";

export function parseCategoryParam(value) {
  if (!value) return [];
  const slug = decodeURIComponent(String(value))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)[0];
  return slug ? [slug] : [];
}

export function parseBrandParam(value) {
  if (!value) return [];
  return decodeURIComponent(String(value))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildShopQuery({ categories = [], brands = [] } = {}) {
  const params = new URLSearchParams();
  if (categories.length) params.set("category", categories.join(","));
  if (brands.length) params.set("brand", brands.join(","));
  const query = params.toString();
  return query ? `/categories?${query}` : "/categories";
}

export async function loadShopProducts(slugs, { limit = SHOP_PAGE_LIMIT, skip = 0 } = {}) {
  const category = slugs[0];

  if (!category) {
    return ProductsApi.getProducts({ limit, skip });
  }

  return ProductsApi.getProductsByCategory(category, {
    limit: CATEGORY_PRODUCT_LIMIT,
    skip: 0,
  });
}

const initialState = {
  categories: [],
  selectedCategories: [],
  selectedBrands: [],
  products: [],
  paging: {
    skip: 0,
    limit: SHOP_PAGE_LIMIT,
    total: 0,
  },
  loading: false,
  loadingMore: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "shop/fetchCategories",
  async (_, { rejectWithValue }) => {
    const response = await CategoriesApi.getCategories();
    if (!response.status) {
      return rejectWithValue(response.error || "Failed to load categories");
    }
    return response.data || [];
  }
);

export const fetchShopProducts = createAsyncThunk(
  "shop/fetchShopProducts",
  async ({ append = false, categories } = {}, { getState, rejectWithValue }) => {
    const slugs = categories ?? getState().shop.selectedCategories;
    const { paging } = getState().shop;
    const skip = slugs.length ? 0 : append ? paging.skip + paging.limit : 0;
    const limit = slugs.length ? CATEGORY_PRODUCT_LIMIT : paging.limit;

    const response = await loadShopProducts(slugs, { limit, skip });
    if (!response.status) {
      return rejectWithValue(response.error || "Failed to load products");
    }

    return {
      ...response.data,
      skip,
      limit: slugs.length ? CATEGORY_PRODUCT_LIMIT : paging.limit,
      append: Boolean(append && !slugs.length),
      selectedCategories: slugs,
    };
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    hydrateShop: (state, action) => {
      const payload = action.payload || {};
      state.categories = payload.categories || [];
      state.selectedCategories = payload.selectedCategories || [];
      state.selectedBrands = payload.selectedBrands || [];
      state.products = (payload.products || []).map(mapProduct);
      state.paging = {
        skip: payload.skip ?? 0,
        limit: payload.limit ?? SHOP_PAGE_LIMIT,
        total: payload.total ?? 0,
      };
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload || [];
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload || [];
    });
    builder.addCase(fetchShopProducts.pending, (state, action) => {
      const slugs = action.meta.arg?.categories;
      if (slugs) state.selectedCategories = slugs;
      if (action.meta.arg?.append) {
        state.loadingMore = true;
      } else {
        state.loading = true;
        state.products = [];
      }
      state.error = null;
    });
    builder.addCase(fetchShopProducts.fulfilled, (state, action) => {
      const {
        products = [],
        total = 0,
        skip = 0,
        limit = SHOP_PAGE_LIMIT,
        append,
        selectedCategories,
      } = action.payload;
      const mapped = products.map(mapProduct);
      state.products = append ? [...state.products, ...mapped] : mapped;
      state.selectedCategories = selectedCategories || [];
      state.paging = { skip, limit, total };
      state.loading = false;
      state.loadingMore = false;
    });
    builder.addCase(fetchShopProducts.rejected, (state, action) => {
      state.error = action.payload || "Failed to load products";
      state.loading = false;
      state.loadingMore = false;
    });
  },
});

export const { hydrateShop, setSelectedCategories, setSelectedBrands } = shopSlice.actions;
export default shopSlice.reducer;
