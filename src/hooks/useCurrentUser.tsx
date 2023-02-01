import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { useCallback, useEffect, useMemo } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { useLocalStorage } from "hooks/useLocalStorage";
import { CURRENT_ORGANIZATION_ID_KEY } from "components/organisms/OrganizationSelector/OrganizationSelector";
import { useGetOrganizationsQuery } from "redux/api/organizations/organizations.api";
import { Organization } from "redux/api/organizations/organizations.types";

export type UseCurrentUserOutput = {
  currentUser?: Auth0User;
  organizations?: Organization[];
  selectedOrganization?: Organization;
  setSelectedOrganization: (organization: Organization) => void;
};

export function useCurrentUser(): UseCurrentUserOutput {
  const { user: auth0User } = useAuth0();

  const { data: organizationsData } = useGetOrganizationsQuery(undefined, {
    skip: !auth0User,
  });
  const organizations = useMemo(
    () => organizationsData?.organizations,
    [organizationsData]
  );

  const [selectedOrganizationId, setSelectedOrganizationId] = useLocalStorage(
    CURRENT_ORGANIZATION_ID_KEY
  );

  const selectedOrganization = useMemo(
    () =>
      organizations
        ? organizations.find(
            (organization) =>
              organization.vcsId.toString() === selectedOrganizationId
          )
        : undefined,
    [organizations, selectedOrganizationId]
  );

  useEffect(() => {
    if (organizations && organizations[0] && !selectedOrganization) {
      setSelectedOrganizationId(organizations[0].vcsId.toString());
    }
  }, [organizations, selectedOrganization, setSelectedOrganizationId]);

  const setSelectedOrganization = useCallback(
    (organization: Organization) =>
      setSelectedOrganizationId(organization.vcsId.toString()),
    [setSelectedOrganizationId]
  );

  useEffect(() => {
    if (auth0User) {
      datadogRum.setUser({
        id: auth0User.sub,
        name: auth0User.name,
        email: auth0User.email,
      });
    }
  }, [auth0User]);

  return useMemo(
    () => ({
      currentUser: auth0User,
      organizations,
      selectedOrganization,
      setSelectedOrganization,
    }),
    [auth0User, organizations, selectedOrganization, setSelectedOrganization]
  );
}
