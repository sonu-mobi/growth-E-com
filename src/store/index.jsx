import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";
import rootReducer from "./rootReducer";

export const makeStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  });

const store = makeStore();

const { dispatch } = store;

const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };
