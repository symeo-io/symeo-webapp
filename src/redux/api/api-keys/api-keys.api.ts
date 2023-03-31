import { api } from "redux/api/api";
import {
  CreateApiKeysInput,
  CreateApiKeysResponse,
  DeleteApiKeysInput,
  GetApiKeysInput,
  GetApiKeysResponse,
} from "redux/api/api-keys/api-keys.types";

const apiKeysQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApiKeys: builder.query<GetApiKeysResponse, GetApiKeysInput>({
      query: ({ configurationId, repositoryVcsId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/api-keys`,
      }),
      providesTags: (result, error, { environmentId }) => [
        { type: "ApiKeys", id: environmentId },
      ],
    }),
  }),
});

const apiKeysMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createApiKey: builder.mutation<CreateApiKeysResponse, CreateApiKeysInput>({
      query: ({ configurationId, repositoryVcsId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/api-keys`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { environmentId }) => [
        { type: "ApiKeys", id: environmentId },
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
    deleteApiKey: builder.mutation<void, DeleteApiKeysInput>({
      query: ({
        configurationId,
        repositoryVcsId,
        environmentId,
        apiKeyId,
      }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/api-keys/${apiKeyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { environmentId }) => [
        { type: "ApiKeys", id: environmentId },
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
  }),
});

export const { useGetApiKeysQuery } = apiKeysQueryApi;

export const { useCreateApiKeyMutation, useDeleteApiKeyMutation } =
  apiKeysMutationApi;
