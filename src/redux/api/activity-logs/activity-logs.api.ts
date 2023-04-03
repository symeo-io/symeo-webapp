import { api } from "redux/api/api";
import {
  GetConfigurationAuditsInput,
  GetConfigurationAuditsResponse,
  GetEnvironmentAuditsInput,
  GetEnvironmentAuditsResponse,
} from "redux/api/activity-logs/activity-logs.types";

export const activityLogQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConfigurationActivityLog: builder.query<
      GetConfigurationAuditsResponse,
      GetConfigurationAuditsInput
    >({
      query: ({ configurationId, repositoryVcsId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/audits`,
      }),
      providesTags: (result, error, { configurationId }) => [
        { type: "ConfigurationActivityLog", id: configurationId },
      ],
    }),
    getEnvironmentActivityLog: builder.query<
      GetEnvironmentAuditsResponse,
      GetEnvironmentAuditsInput
    >({
      query: ({ environmentId, configurationId, repositoryVcsId }) => ({
        url: `/api/v1/configurations/${repositoryVcsId}/${configurationId}/${environmentId}/audits`,
      }),
      providesTags: (result, error, { environmentId }) => [
        { type: "EnvironmentActivityLog", id: environmentId },
      ],
    }),
  }),
});

export const {
  useGetConfigurationActivityLogQuery,
  useGetEnvironmentActivityLogQuery,
} = activityLogQueryApi;
