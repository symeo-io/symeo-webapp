import { api } from "../api";
import {
  GetRepositoriesResponse,
  GetRepositoryBranchesInput,
  GetRepositoryBranchesResponse,
} from "redux/api/repositories/repositories.types";

export const repositoriesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRepositories: builder.query<GetRepositoriesResponse, void>({
      query: () => ({
        url: `/api/v1/repositories`,
      }),
      providesTags: ["Repositories"],
    }),
    getRepositoryBranches: builder.query<
      GetRepositoryBranchesResponse,
      GetRepositoryBranchesInput
    >({
      query: ({ repositoryVcsId }) => ({
        url: `/api/v1/repositories/${repositoryVcsId}/branches`,
      }),
      providesTags: (_, __, { repositoryVcsId }) => [
        { type: "Branches", id: repositoryVcsId },
      ],
    }),
  }),
});

export const { useGetRepositoriesQuery, useGetRepositoryBranchesQuery } =
  repositoriesQueryApi;
