import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsApi } from "@api/modules/products.api";
import { PRODUCT_PAGE_LIMIT } from "@config/apiConfig";

export const mapProduct = (product) => {
  const discounted = Number(product.discountPercentage) > 0;
  const oldPrice = discounted
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  return {
    id: product.id,
    name: product.title,
    price: product.price,
    oldPrice: oldPrice && oldPrice > product.price ? oldPrice : null,
    image: product.thumbnail,
    rating: product.rating,
    category: product.category,
    discountPercentage: product.discountPercentage,
  };
};

const initialState = {
  products: [],
  paging: {
    skip: 0,
    limit: PRODUCT_PAGE_LIMIT,
    total: 0,
  },
  loading: false,
  loadingMore: false,
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    hydrateProducts: (state, action) => {
      const payload = action.payload || {};
      state.products = (payload.products || []).map(mapProduct);
      state.paging = {
        skip: payload.skip ?? 0,
        limit: payload.limit ?? PRODUCT_PAGE_LIMIT,
        total: payload.total ?? 0,
      };
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
    },
    resetProductList: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      const append = action.meta.arg?.append;
      if (append) {
        state.loadingMore = true;
      } else {
        state.loading = true;
      }
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { products = [], total = 0, skip = 0, limit = PRODUCT_PAGE_LIMIT, append } =
        action.payload;
      const mapped = products.map(mapProduct);
      state.products = append ? [...state.products, ...mapped] : mapped;
      state.paging = { skip, limit, total };
      state.loading = false;
      state.loadingMore = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload || "Failed to load products";
      state.loading = false;
      state.loadingMore = false;
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "productList/fetchProducts",
  async ({ append = false } = {}, { getState, rejectWithValue }) => {
    const { paging } = getState().productList;
    const skip = append ? paging.skip + paging.limit : 0;
    const limit = paging.limit;

    const response = await ProductsApi.getProducts({ limit, skip });
    if (!response.status) {
      return rejectWithValue(response.error || "Failed to load products");
    }

    return {
      ...response.data,
      skip,
      limit,
      append,
    };
  }
);

export const loadMoreProducts = () => fetchProducts({ append: true });

export const { hydrateProducts, resetProductList } = productListSlice.actions;
export default productListSlice.reducer;
