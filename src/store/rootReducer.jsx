import { combineReducers } from "@reduxjs/toolkit";
import productListSlice from "./slices/productListSlice";
import productDetailSlice from "./slices/productDetailSlice";
import shopSlice from "./slices/shopSlice";

const rootReducer = combineReducers({
  productList: productListSlice,
  productDetail: productDetailSlice,
  shop: shopSlice,
});

export default rootReducer;
