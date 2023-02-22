import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useGetOrganizationsQuery } from "redux/api/organizations/organizations.api";
import { Organization } from "redux/api/organizations/organizations.types";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "hooks/useNavigate";

export const LAST_SELECTED_ORGANIZATION_NAME_KEY =
  "LAST_SELECTED_ORGANIZATION_NAM";

export type UseSelectedOrganizationOutput = {
  organizations?: Organization[];
  selectedOrganization?: Organization;
  lastSelectedOrganization?: Organization;
  setSelectedOrganization: (organization: Organization) => void;
};

export function useSelectedOrganization(): UseSelectedOrganizationOutput {
  const { currentUser } = useCurrentUser();
  const { organizationName } = useParams();
  const navigate = useNavigate();

  const { data: organizationsData } = useGetOrganizationsQuery(undefined, {
    skip: !currentUser,
  });
  const organizations = useMemo(
    () => organizationsData?.organizations,
    [organizationsData]
  );

  const [lastSelectedOrganizationName, setLastSelectedOrganizationName] =
    useLocalStorage(LAST_SELECTED_ORGANIZATION_NAME_KEY);

  const selectedOrganization = useMemo(
    () =>
      organizations
        ? organizations.find(
            (organization) => organization.name === organizationName
          )
        : undefined,
    [organizationName, organizations]
  );

  const lastSelectedOrganization = useMemo(
    () =>
      organizations
        ? organizations.find(
            (organization) => organization.name === lastSelectedOrganizationName
          )
        : undefined,
    [lastSelectedOrganizationName, organizations]
  );

  useEffect(() => {
    if (organizationName) {
      setLastSelectedOrganizationName(organizationName);
    }
  }, [organizationName, setLastSelectedOrganizationName]);

  const setSelectedOrganization = useCallback(
    (organization: Organization) =>
      navigate("projects", { params: { organizationName: organization.name } }),
    [navigate]
  );

  return useMemo(
    () => ({
      organizations,
      selectedOrganization,
      setSelectedOrganization,
      lastSelectedOrganization,
    }),
    [
      lastSelectedOrganization,
      organizations,
      selectedOrganization,
      setSelectedOrganization,
    ]
  );
}
