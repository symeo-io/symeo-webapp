import { api } from "redux/api/api";
import {
  GetEnvironmentValuesInput,
  GetEnvironmentValuesResponse,
  SetEnvironmentValuesInput,
} from "redux/api/values/values.types";

const valuesQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getValuesForEnvironment: builder.query<
      GetEnvironmentValuesResponse,
      GetEnvironmentValuesInput
    >({
      query: ({ configurationId, repositoryVcsId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/values`,
      }),
      providesTags: (result, error, { environmentId }) => [
        { type: "Values", id: environmentId },
      ],
    }),
    getValuesForEnvironmentWithSecrets: builder.query<
      GetEnvironmentValuesResponse,
      GetEnvironmentValuesInput
    >({
      query: ({ configurationId, repositoryVcsId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/values/secrets`,
      }),
      providesTags: (result, error, { environmentId }) => [
        { type: "ValuesSecrets", id: environmentId },
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
      ],
    }),
  }),
});

export const {
  useGetValuesForEnvironmentQuery,
  useLazyGetValuesForEnvironmentWithSecretsQuery,
} = valuesQueryApi;
export const { useSetValuesForEnvironmentMutation } = valuesMutationApi;
