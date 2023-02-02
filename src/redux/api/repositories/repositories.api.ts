import { api } from "../api";
import {
  GetRepositoriesInput,
  GetRepositoriesResponse,
} from "redux/api/repositories/repositories.types";

export const repositoriesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepositories: builder.query<
      GetRepositoriesResponse,
      GetRepositoriesInput
    >({
      query: ({ ownerName }) => ({
        url: `/api/v1/organizations/${ownerName}/repos`,
      }),
      providesTags: (_, __, { ownerName }) => [
        { type: "Repositories", ownerName },
      ],
    }),
  }),
});

export const { useGetRepositoriesQuery } = repositoriesQueryApi;
