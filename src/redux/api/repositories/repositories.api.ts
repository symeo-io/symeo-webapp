import { api } from "../api";
import {
  CreateRepositoryCommitInput,
  GetRepositoriesResponse,
  GetRepositoryBranchesInput,
  GetRepositoryBranchesResponse,
  GetRepositoryEnvFilesInput,
  GetRepositoryEnvFilesResponse,
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
    getRepositoryEnvFiles: builder.query<
      GetRepositoryEnvFilesResponse,
      GetRepositoryEnvFilesInput
    >({
      query: ({ repositoryVcsId, branch }) => ({
        url: `/api/v1/repositories/${repositoryVcsId}/env-files/${branch}`,
      }),
      providesTags: (_, __, { repositoryVcsId, branch }) => [
        { type: "EnvFiles", id: repositoryVcsId, branch },
      ],
    }),
  }),
});

export const repositoriesMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    commitFile: builder.mutation<void, CreateRepositoryCommitInput>({
      query: ({ repositoryVcsId, branch, ...body }) => ({
        url: `/api/v1/repositories/${repositoryVcsId}/commit/${branch}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRepositoriesQuery,
  useGetRepositoryBranchesQuery,
  useGetRepositoryEnvFilesQuery,
} = repositoriesQueryApi;

export const { useCommitFileMutation } = repositoriesMutationApi;
