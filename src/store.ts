import { configureStore } from "@reduxjs/toolkit";
import { api } from "redux/api/api";
import { snackbarMiddleware } from "redux/api/snackbar.middleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(snackbarMiddleware),
});
