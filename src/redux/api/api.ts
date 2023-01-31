import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { getAccessToken } from "providers/GetTokenProvider";

export const apiTagTypes = [];

export const api = createApi({
  tagTypes: apiTagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
