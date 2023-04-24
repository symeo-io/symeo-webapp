import { api } from "../api";
import {
  AddLicenceKeyToOrganizationsInput,
  GetOrganizationsResponse,
} from "./organizations.types";

export const organizationsQueryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<GetOrganizationsResponse, void>({
      query: () => ({
        url: `/api/v1/organizations`,
      }),
      providesTags: ["Organizations"],
    }),
  }),
});

export const organizationsMutationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLicenceKeyToOrganization: builder.mutation<
      void,
      AddLicenceKeyToOrganizationsInput
    >({
      query: (body) => ({
        url: `/api/v1/organizations/licence-key`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Organizations"],
    }),
  }),
});

export const { useGetOrganizationsQuery } = organizationsQueryApi;
export const { useAddLicenceKeyToOrganizationMutation } =
  organizationsMutationApi;
