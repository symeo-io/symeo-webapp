import { api } from "../api";
import {
  GetEnvironmentPermissionsInput,
  GetEnvironmentPermissionsResponse,
  UpdateEnvironmentPermissionsInput,
  UpdateEnvironmentPermissionsResponse,
} from "redux/api/environment-permissions/environment-permissions.types";

export const environmentPermissionsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEnvironmentPermissions: builder.query<
      GetEnvironmentPermissionsResponse,
      GetEnvironmentPermissionsInput
    >({
      query: ({ repositoryVcsId, configurationId, environmentId }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/permissions`,
      }),
      providesTags: (_, __, { environmentId }) => [
        { type: "EnvironmentPermissions", id: environmentId },
      ],
    }),
  }),
});

const environmentPermissionsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateEnvironmentPermissions: builder.mutation<
      UpdateEnvironmentPermissionsResponse,
      UpdateEnvironmentPermissionsInput
    >({
      query: ({
        repositoryVcsId,
        configurationId,
        environmentId,
        ...body
      }) => ({
        url: `/api/v1/configurations/github/${repositoryVcsId}/${configurationId}/environments/${environmentId}/permissions`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetEnvironmentPermissionsQuery } =
  environmentPermissionsQueryApi;

export const { useUpdateEnvironmentPermissionsMutation } =
  environmentPermissionsMutationApi;
