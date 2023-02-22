import { api } from "../api";
import { GetOrganizationsResponse } from "./organizations.types";

export const organizationsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<GetOrganizationsResponse, void>({
      query: () => ({
        url: `/api/v1/organizations`,
      }),
      providesTags: ["Organizations"],
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizationsQueryApi;
