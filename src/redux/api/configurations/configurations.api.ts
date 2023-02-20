import { api } from "redux/api/api";
import {
  CreateGitHubConfigurationInput,
  CreateGitHubConfigurationResponse,
  GetConfigurationContractInput,
  GetConfigurationContractResponse,
  GetConfigurationInput,
  GetConfigurationResponse,
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
      query: ({ configurationId, repositoryVcsId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/contract`,
      }),
      providesTags: (result, error, { configurationId }) => [
        { type: "ConfigurationContract", id: configurationId },
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
  }),
});

export const { useGetConfigurationQuery, useGetConfigurationContractQuery } =
  configurationQueryApi;

export const {
  useCreateGitHubConfigurationMutation,
  useValidateGitHubConfigurationMutation,
} = configurationsMutationApi;
