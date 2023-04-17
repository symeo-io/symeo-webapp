import { api } from "redux/api/api";
import {
  CreateEnvironmentInput,
  CreateEnvironmentResponse,
  DeleteEnvironmentInput,
  UpdateEnvironmentInput,
  UpdateEnvironmentResponse,
} from "redux/api/environments/environments.types";
import { configurationQueryApi } from "redux/api/configurations/configurations.api";

const environmentsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEnvironment: builder.mutation<
      CreateEnvironmentResponse,
      CreateEnvironmentInput
    >({
      query: ({ repositoryVcsId, configurationId, ...body }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/environments`,
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { repositoryVcsId, configurationId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: createdEnvironmentData } = await queryFulfilled;
          dispatch(
            configurationQueryApi.util.updateQueryData(
              "getConfiguration",
              { configurationId, repositoryVcsId },
              (draft) => {
                draft.configuration.environments = [
                  ...draft.configuration.environments,
                  createdEnvironmentData.environment,
                ];
              }
            )
          );
        } catch {}
      },
    }),
    deleteEnvironment: builder.mutation<void, DeleteEnvironmentInput>({
      query: ({ repositoryVcsId, configurationId, environmentId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/environments/${environmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { configurationId, environmentId }) => [
        { type: "Configuration", id: configurationId },
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
    updateEnvironment: builder.mutation<
      UpdateEnvironmentResponse,
      UpdateEnvironmentInput
    >({
      query: ({
        repositoryVcsId,
        configurationId,
        environmentId,
        ...body
      }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/environments/${environmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { configurationId, environmentId }) => [
        { type: "Configuration", id: configurationId },
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
  }),
});

export const {
  useCreateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useUpdateEnvironmentMutation,
} = environmentsMutationApi;
