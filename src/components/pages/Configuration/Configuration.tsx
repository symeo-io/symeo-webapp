import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useGetConfigurationQuery } from "redux/api/configurations/configurations.api";
import { useParams } from "react-router-dom";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { Environment } from "redux/api/environments/environments.types";
import ConfigurationContent from "components/organisms/ConfigurationContent/ConfigurationContent";

function Configuration() {
  const { formatMessage } = useIntl();
  const { repositoryVcsId, configurationId } = useParams();
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState<
    string | undefined
  >(undefined);
  const [selectedBranchName, setSelectedBranchName] = useState<
    string | undefined
  >(undefined);

  const { data: configurationData, isLoading } = useGetConfigurationQuery(
    {
      configurationId: configurationId as string,
      repositoryVcsId: (repositoryVcsId && parseInt(repositoryVcsId)) as number,
    },
    { skip: !repositoryVcsId || !configurationId }
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

  useEffect(() => {
    if (configuration && !selectedEnvironment) {
      setSelectedEnvironment(configuration.environments[0]);
    }
  }, [configuration, selectedEnvironment, setSelectedEnvironment]);

  useEffect(() => {
    if (configuration && !selectedBranchName) {
      setSelectedBranchName(configuration.branch);
    }
  }, [configuration, selectedBranchName, setSelectedBranchName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {isLoading && <LoadingBox sx={{ flex: 1 }} />}
      {!isLoading && configuration && (
        <>
          <Box
            sx={{
              marginBottom: (theme) => theme.spacing(4),
              display: "flex",
              alignItems: "center",
            }}
          >
            <DataObjectIcon
              sx={{
                marginRight: (theme) => theme.spacing(1),
                fontSize: "2rem",
              }}
            />
            <Typography variant="h1" sx={{ flex: 1 }}>
              {formatMessage(
                { id: "configuration.title" },
                {
                  configurationName: configuration.name,
                  repositoryName: configuration.repository.name,
                }
              )}
            </Typography>
          </Box>
          {selectedEnvironment && selectedBranchName && (
            <ConfigurationContent
              configuration={configuration}
              environment={selectedEnvironment}
              setEnvironment={setSelectedEnvironment}
              branch={selectedBranchName}
              setBranch={setSelectedBranchName}
              isCurrentUserAdmin={isCurrentUserAdmin}
              currentUserEnvironmentRole={currentUserEnvironmentRole}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Configuration;
