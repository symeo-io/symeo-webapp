import { api } from "redux/api/api";
import {
  GetEnvironmentValuesInput,
  GetEnvironmentValuesResponse,
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
  }),
});

export const { useGetValuesForEnvironmentQuery } = valuesQueryApi;
