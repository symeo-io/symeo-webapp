import { api } from "redux/api/api";
import {
  CreateConfigurationInput,
  CreateConfigurationResponse,
  DeleteConfigurationInput,
  GetConfigurationContractInput,
  GetConfigurationContractResponse,
  GetConfigurationInput,
  GetConfigurationResponse,
  UpdateConfigurationInput,
  UpdateConfigurationResponse,
  ValidateConfigurationInput,
  ValidateConfigurationResponse,
} from "redux/api/configurations/configurations.types";
import { repositoriesQueryApi } from "redux/api/repositories/repositories.api";

export const configurationQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query<
      GetConfigurationResponse,
      GetConfigurationInput
    >({
      query: ({ configurationId, repositoryVcsId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}`,
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
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/contract`,
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
    validateConfiguration: builder.mutation<
      ValidateConfigurationResponse,
      ValidateConfigurationInput
    >({
      query: (body) => ({
        url: `/api/v1/configurations/validate`,
        method: "POST",
        body,
      }),
    }),
    createConfiguration: builder.mutation<
      CreateConfigurationResponse,
      CreateConfigurationInput
    >({
      query: ({ repositoryVcsId, ...body }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}`,
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
    updateConfiguration: builder.mutation<
      UpdateConfigurationResponse,
      UpdateConfigurationInput
    >({
      query: ({ repositoryVcsId, configurationId, ...body }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { configurationId }) => [
        { type: "ConfigurationContract", id: configurationId },
        { type: "ConfigurationActivityLog", id: configurationId },
      ],
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
    deleteConfiguration: builder.mutation<void, DeleteConfigurationInput>({
      query: ({ repositoryVcsId, configurationId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { configurationId }) => [
        { type: "ConfigurationActivityLog", id: configurationId },
      ],
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
  useCreateConfigurationMutation,
  useUpdateConfigurationMutation,
  useDeleteConfigurationMutation,
  useValidateConfigurationMutation,
} = configurationsMutationApi;
