import { api } from "redux/api/api";
import {
  CreateGitHubConfigurationInput,
  CreateGitHubConfigurationResponse,
  DeleteGitHubConfigurationInput,
  GetConfigurationContractInput,
  GetConfigurationContractResponse,
  GetConfigurationInput,
  GetConfigurationResponse,
  UpdateGitHubConfigurationInput,
  UpdateGitHubConfigurationResponse,
  ValidateGitHubConfigurationInput,
  ValidateGitHubConfigurationResponse,
} from "redux/api/configurations/configurations.types";

export const configurationQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query<
      GetConfigurationResponse,
      GetConfigurationInput
    >({
      query: ({ configurationId, repositoryVcsId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}`,
      }),
      providesTags: (result, error, { configurationId }) => [
        { type: "Configuration", id: configurationId },
      ],
    }),
    getConfigurationContract: builder.query<
      GetConfigurationContractResponse,
      GetConfigurationContractInput
    >({
      query: ({ configurationId, repositoryVcsId, branch }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/contract`,
        params: {
          branch,
        },
      }),
      providesTags: (result, error, { configurationId, branch }) => [
        { type: "ConfigurationContract", id: configurationId, branch },
      ],
    }),
  }),
});

const configurationsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateGitHubConfiguration: builder.mutation<
      ValidateGitHubConfigurationResponse,
      ValidateGitHubConfigurationInput
    >({
      query: (body) => ({
        url: `/api/v1/configurations/github/validate`,
        method: "POST",
        body,
      }),
    }),
    createGitHubConfiguration: builder.mutation<
      CreateGitHubConfigurationResponse,
      CreateGitHubConfigurationInput
    >({
      query: (body) => ({
        url: `/api/v1/configurations/github`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Repositories" }],
    }),
    updateGitHubConfiguration: builder.mutation<
      UpdateGitHubConfigurationResponse,
      UpdateGitHubConfigurationInput
    >({
      query: ({ repositoryVcsId, configurationId, ...body }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Repositories" }],
    }),
    deleteGitHubConfiguration: builder.mutation<
      void,
      DeleteGitHubConfigurationInput
    >({
      query: ({ repositoryVcsId, configurationId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Repositories" }],
    }),
  }),
});

export const { useGetConfigurationQuery, useGetConfigurationContractQuery } =
  configurationQueryApi;

export const {
  useCreateGitHubConfigurationMutation,
  useUpdateGitHubConfigurationMutation,
  useDeleteGitHubConfigurationMutation,
  useValidateGitHubConfigurationMutation,
} = configurationsMutationApi;
