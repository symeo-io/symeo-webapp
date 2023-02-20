import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useGetConfigurationQuery } from "redux/api/configurations/configurations.api";
import { useParams } from "react-router-dom";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import ConfigurationEditor from "components/organisms/ConfigurationEditor/ConfigurationEditor";
import EnvironmentSelector from "components/molecules/EnvironmentSelector/EnvironmentSelector";
import { Environment } from "redux/api/environments/environments.types";

function Configuration() {
  const { formatMessage } = useIntl();
  const { repositoryVcsId, configurationId } = useParams();
  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState<
    string | null
  >(null);

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

  const selectedEnvironment = useMemo(
    () =>
      configuration?.environments.find(
        (environment) => environment.id === selectedEnvironmentId
      ) ?? null,
    [configuration?.environments, selectedEnvironmentId]
  );

  const setSelectedEnvironment = useCallback(
    (environment: Environment) => setSelectedEnvironmentId(environment.id),
    []
  );

  useEffect(() => {
    if (configuration && !selectedEnvironment) {
      setSelectedEnvironmentId(configuration.environments[0]?.id);
    }
  }, [configuration, selectedEnvironment]);

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: (theme) => theme.spacing(2),
            }}
          >
            <Box sx={{ flex: 1, display: "flex" }}>
              {selectedEnvironment && (
                <EnvironmentSelector
                  value={selectedEnvironment}
                  onChange={setSelectedEnvironment}
                  environments={configuration.environments}
                  repositoryVcsId={configuration.repository.vcsId}
                  configurationName={configuration.name}
                  configurationId={configuration.id}
                />
              )}
            </Box>
          </Box>
          {selectedEnvironment && (
            <ConfigurationEditor
              configuration={configuration}
              environment={selectedEnvironment}
              sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Configuration;
