import { api } from "../api";
import { GetRepositoriesResponse } from "redux/api/repositories/repositories.types";

export const repositoriesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepositories: builder.query<GetRepositoriesResponse, void>({
      query: () => ({
        url: `/api/v1/repositories`,
      }),
      providesTags: ["Repositories"],
    }),
  }),
});

export const { useGetRepositoriesQuery } = repositoriesQueryApi;
