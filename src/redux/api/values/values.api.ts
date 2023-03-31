import { api } from "redux/api/api";
import {
  GetEnvironmentValuesInput,
  GetEnvironmentValuesResponse,
  RollbackEnvironmentValuesInput,
  SetEnvironmentValuesInput,
} from "redux/api/values/values.types";

const valuesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getValuesForEnvironment: builder.query<
      GetEnvironmentValuesResponse,
      GetEnvironmentValuesInput
    >({
      query: ({
        configurationId,
        repositoryVcsId,
        environmentId,
        branch,
        versionId,
      }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/values`,
        params: { branch, versionId },
      }),
      providesTags: (result, error, { environmentId, branch, versionId }) => [
        { type: "Values", id: environmentId, branch, versionId },
      ],
    }),
    getValuesForEnvironmentWithSecrets: builder.query<
      GetEnvironmentValuesResponse,
      GetEnvironmentValuesInput
    >({
      query: ({
        configurationId,
        repositoryVcsId,
        environmentId,
        branch,
        versionId,
      }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/values/secrets`,
        params: { branch, versionId },
      }),
      providesTags: (result, error, { environmentId, branch, versionId }) => [
        { type: "ValuesSecrets", id: environmentId, branch, versionId },
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
  }),
});

const valuesMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setValuesForEnvironment: builder.mutation<void, SetEnvironmentValuesInput>({
      query: ({ configurationId, repositoryVcsId, environmentId, values }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/values`,
        method: "POST",
        body: { values },
      }),
      invalidatesTags: (_, __, { environmentId }) => [
        { type: "Values", id: environmentId },
        { type: "EnvironmentActivityLog", id: environmentId },
        { type: "EnvironmentValuesVersions", id: environmentId },
      ],
    }),
    rollbackValuesForEnvironment: builder.mutation<
      void,
      RollbackEnvironmentValuesInput
    >({
      query: ({
        configurationId,
        repositoryVcsId,
        environmentId,
        versionId,
      }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/rollback/${versionId}`,
        method: "POST",
      }),
      invalidatesTags: (_, __, { environmentId }) => [
        { type: "Values", id: environmentId },
        { type: "EnvironmentActivityLog", id: environmentId },
        { type: "EnvironmentValuesVersions", id: environmentId },
      ],
    }),
  }),
});

export const {
  useGetValuesForEnvironmentQuery,
  useLazyGetValuesForEnvironmentWithSecretsQuery,
} = valuesQueryApi;
export const {
  useSetValuesForEnvironmentMutation,
  useRollbackValuesForEnvironmentMutation,
} = valuesMutationApi;
