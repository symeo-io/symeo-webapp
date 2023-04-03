import { api } from "redux/api/api";
import {
  GetValuesVersionsInput,
  GetValuesVersionsResponse,
} from "redux/api/point-in-time-recovery/point-in-time-recovery.types";

export const pointInTimeRecoveryQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEnvironmentValuesVersions: builder.query<
      GetValuesVersionsResponse,
      GetValuesVersionsInput
    >({
      query: ({ configurationId, repositoryVcsId, environmentId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/environments/${environmentId}/versions`,
      }),
      providesTags: (result, error, { environmentId }) => [
        { type: "EnvironmentValuesVersions", id: environmentId },
      ],
    }),
  }),
});

export const { useGetEnvironmentValuesVersionsQuery } =
  pointInTimeRecoveryQueryApi;
