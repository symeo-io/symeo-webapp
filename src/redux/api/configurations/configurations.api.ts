import { api } from "redux/api/api";
import {
  CreateGitHubConfigurationInput,
  CreateGitHubConfigurationResponse,
  ValidateGitHubConfigurationInput,
  ValidateGitHubConfigurationResponse,
} from "redux/api/configurations/configurations.types";

const configurationsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateGitHubConfiguration: builder.mutation<
      ValidateGitHubConfigurationResponse,
      ValidateGitHubConfigurationInput
    >({
      query: (body) => ({
        url: `/api/v1/configurations/github/validate`,
        method: "POST",
        body,
      }),
    }),
    createGitHubConfiguration: builder.mutation<
      CreateGitHubConfigurationResponse,
      CreateGitHubConfigurationInput
    >({
      query: (body) => ({
        url: `/api/v1/configurations/github`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Repositories" }],
    }),
  }),
});

export const {
  useCreateGitHubConfigurationMutation,
  useValidateGitHubConfigurationMutation,
} = configurationsMutationApi;
