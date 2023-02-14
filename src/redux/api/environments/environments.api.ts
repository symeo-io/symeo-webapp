import { api } from "redux/api/api";
import {
  CreateEnvironmentInput,
  CreateEnvironmentResponse,
  DeleteEnvironmentInput,
  UpdateEnvironmentInput,
  UpdateEnvironmentResponse,
} from "redux/api/environments/environments.types";

const environmentsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEnvironment: builder.mutation<
      CreateEnvironmentResponse,
      CreateEnvironmentInput
    >({
      query: ({ repositoryVcsId, configurationId, ...body }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, { configurationId }) => [
        { type: "Configuration", id: configurationId },
      ],
    }),
    deleteEnvironment: builder.mutation<void, DeleteEnvironmentInput>({
      query: ({ repositoryVcsId, configurationId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { configurationId }) => [
        { type: "Configuration", id: configurationId },
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
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { configurationId }) => [
        { type: "Configuration", id: configurationId },
      ],
    }),
  }),
});

export const {
  useCreateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useUpdateEnvironmentMutation,
} = environmentsMutationApi;
