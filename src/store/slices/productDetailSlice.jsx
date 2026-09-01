import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsApi } from "@api/modules/products.api";
import { mapProduct } from "./productListSlice";

export const mapProductDetail = (product) => ({
  ...mapProduct(product),
  description: product.description,
  brand: product.brand,
  sku: product.sku,
  stock: product.stock,
  tags: product.tags || [],
  images: product.images?.length ? product.images : [product.thumbnail].filter(Boolean),
  warrantyInformation: product.warrantyInformation,
  shippingInformation: product.shippingInformation,
  availabilityStatus: product.availabilityStatus,
  reviews: product.reviews || [],
  returnPolicy: product.returnPolicy,
  dimensions: product.dimensions,
  weight: product.weight,
});

const initialState = {
  product: null,
  related: [],
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    hydrateProductDetail: (state, action) => {
      const { product, related } = action.payload || {};
      state.product = product ? mapProductDetail(product) : null;
      state.related = (related || [])
        .filter((item) => item.id !== product?.id)
        .slice(0, 4)
        .map(mapProduct);
      state.loading = false;
      state.error = null;
    },
    resetProductDetail: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.product = mapProductDetail(action.payload.product);
      state.related = (action.payload.related || [])
        .filter((item) => item.id !== action.payload.product.id)
        .slice(0, 4)
        .map(mapProduct);
      state.loading = false;
    });
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.error = action.payload || "Failed to load product";
      state.loading = false;
    });
  },
});

export const fetchProductDetail = createAsyncThunk(
  "productDetail/fetchProductDetail",
  async (id, { rejectWithValue }) => {
    const productResponse = await ProductsApi.getProduct(id);
    if (!productResponse.status || !productResponse.data?.id) {
      return rejectWithValue(productResponse.error || "Product not found");
    }

    const relatedResponse = await ProductsApi.getProductsByCategory(
      productResponse.data.category,
      { limit: 5 }
    );

    return {
      product: productResponse.data,
      related: relatedResponse.status ? relatedResponse.data.products : [],
    };
  }
);

export const { hydrateProductDetail, resetProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
