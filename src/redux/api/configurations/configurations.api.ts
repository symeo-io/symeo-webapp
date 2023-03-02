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
import { repositoriesQueryApi } from "redux/api/repositories/repositories.api";

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
      query: ({ repositoryVcsId, ...body }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}`,
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { repositoryVcsId, ...body },
        { dispatch, queryFulfilled }
      ) {
        try {
          const createdConfigurationData = await queryFulfilled;
          dispatch(
            repositoriesQueryApi.util.updateQueryData(
              "getRepositories",
              undefined,
              (draft) => {
                const repository = draft.repositories.find(
                  (repo) => repo.vcsId === repositoryVcsId
                );

                if (!repository || !repository.configurations) {
                  return;
                }

                repository.configurations = [
                  ...repository.configurations,
                  createdConfigurationData.data.configuration,
                ];
              }
            )
          );
        } catch {}
      },
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
      async onQueryStarted(
        { repositoryVcsId, configurationId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            repositoriesQueryApi.util.updateQueryData(
              "getRepositories",
              undefined,
              (draft) => {
                const repository = draft.repositories.find(
                  (repo) => repo.vcsId === repositoryVcsId
                );

                if (!repository || !repository.configurations) {
                  return;
                }

                const configuration = repository.configurations.find(
                  (configuration) => configuration.id === configurationId
                );

                if (!configuration) {
                  return;
                }

                configuration.name = patch.name;
                configuration.contractFilePath = patch.contractFilePath;
                configuration.branch = patch.branch;
              }
            )
          );
        } catch {}
      },
    }),
    deleteGitHubConfiguration: builder.mutation<
      void,
      DeleteGitHubConfigurationInput
    >({
      query: ({ repositoryVcsId, configurationId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { repositoryVcsId, configurationId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            repositoriesQueryApi.util.updateQueryData(
              "getRepositories",
              undefined,
              (draft) => {
                const repository = draft.repositories.find(
                  (repo) => repo.vcsId === repositoryVcsId
                );

                if (!repository || !repository.configurations) {
                  return;
                }

                repository.configurations = [
                  ...repository.configurations.filter(
                    (configuration) => configuration.id !== configurationId
                  ),
                ];
              }
            )
          );
        } catch {}
      },
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
