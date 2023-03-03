import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetConfigurationQuery } from "redux/api/configurations/configurations.api";
import { useGetRepositoryBranchesQuery } from "redux/api/repositories/repositories.api";
import { Environment } from "redux/api/environments/environments.types";

export function useConfigurationData(
  repositoryVcsId: number,
  configurationId: string
) {
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState<
    string | undefined
  >(undefined);
  const [selectedBranchName, setSelectedBranchName] = useState<
    string | undefined
  >(undefined);

  const { data: configurationData, isLoading: isLoadingConfiguration } =
    useGetConfigurationQuery(
      {
        configurationId,
        repositoryVcsId,
      },
      { skip: !repositoryVcsId || !configurationId }
    );
  const { data: branchesData } = useGetRepositoryBranchesQuery(
    {
      repositoryVcsId,
    },
    { skip: !repositoryVcsId }
  );

  const configuration = useMemo(
    () => configurationData?.configuration,
    [configurationData?.configuration]
  );

  const isCurrentUserAdmin = useMemo(
    () => configurationData?.isCurrentUserRepositoryAdmin ?? false,
    [configurationData?.isCurrentUserRepositoryAdmin]
  );

  const currentUserEnvironmentPermission = useMemo(
    () =>
      configurationData?.currentUserEnvironmentsPermissions.find(
        (permission) => permission.environmentId === selectedEnvironmentId
      ) ?? undefined,
    [
      configurationData?.currentUserEnvironmentsPermissions,
      selectedEnvironmentId,
    ]
  );

  const currentUserEnvironmentRole = useMemo(
    () => currentUserEnvironmentPermission?.environmentPermissionRole,
    [currentUserEnvironmentPermission?.environmentPermissionRole]
  );

  const branches = useMemo(
    () => branchesData?.branches ?? [],
    [branchesData?.branches]
  );

  const selectedEnvironment = useMemo(
    () =>
      configuration?.environments.find(
        (environment) => environment.id === selectedEnvironmentId
      ) ?? undefined,
    [configuration?.environments, selectedEnvironmentId]
  );

  const setSelectedEnvironment = useCallback(
    (environment: Environment) => setSelectedEnvironmentId(environment.id),
    []
  );

  const environments = useMemo(
    () =>
      (configuration &&
        [...configuration.environments].sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        })) ??
      [],
    [configuration]
  );

  useEffect(() => {
    if (configuration && !selectedEnvironment) {
      setSelectedEnvironmentId(environments[0]?.id);
    }
  }, [configuration, selectedEnvironment, environments]);

  useEffect(() => {
    if (configuration && !selectedBranchName) {
      setSelectedBranchName(configuration.branch);
    }
  }, [configuration, selectedBranchName]);

  return {
    configuration,
    isLoadingConfiguration,
    environments,
    branches,
    selectedEnvironment,
    setSelectedEnvironment,
    currentUserEnvironmentRole,
    isCurrentUserAdmin,
    selectedBranchName,
    setSelectedBranchName,
  };
}
