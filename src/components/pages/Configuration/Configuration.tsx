import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useGetConfigurationQuery } from "redux/api/configurations/configurations.api";
import { useParams } from "react-router-dom";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import EnvironmentTab from "components/molecules/EnvironmentTab/EnvironmentTab";
import { Environment } from "redux/api/configurations/configurations.types";
import ConfigurationEditor from "components/organisms/ConfigurationEditor/ConfigurationEditor";

function Configuration() {
  const { formatMessage } = useIntl();
  const { repositoryVcsId, configurationId } = useParams();
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null);

  const { data: configurationData, isLoading } = useGetConfigurationQuery(
    {
      configurationId: configurationId as string,
      repositoryVcsId: repositoryVcsId as string,
    },
    { skip: !repositoryVcsId || !configurationId }
  );

  const configuration = useMemo(
    () => configurationData?.configuration,
    [configurationData?.configuration]
  );

  useEffect(() => {
    if (configuration && !selectedEnvironment) {
      setSelectedEnvironment(configuration.environments[0]);
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
          <Box sx={{ display: "flex", marginTop: (theme) => theme.spacing(2) }}>
            {configuration.environments.map((environment) => (
              <EnvironmentTab
                key={environment.id}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(1),
                }}
                repositoryVcsId={configuration.repository.vcsId}
                configurationId={configuration.id}
                environment={environment}
                active={selectedEnvironment?.id === environment.id}
                onClick={() => setSelectedEnvironment(environment)}
              />
            ))}
          </Box>
          {selectedEnvironment && (
            <ConfigurationEditor
              configuration={configuration}
              environment={selectedEnvironment}
              sx={{ marginTop: (theme) => theme.spacing(3), flex: 1 }}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Configuration;
