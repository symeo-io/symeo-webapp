import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useParams } from "react-router-dom";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import ConfigurationEditor from "components/organisms/ConfigurationEditor/ConfigurationEditor";
import EnvironmentSelector from "components/molecules/EnvironmentSelector/EnvironmentSelector";
import EnvironmentSettingsButton from "components/molecules/EnvironmentSettingsButton/EnvironmentSettingsButton";
import BranchSelector from "components/molecules/BranchSelector/BranchSelector";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { meetRoleRequirement } from "redux/api/environment-permissions/environment-permissions.types";
import ConfigurationViewer from "components/organisms/ConfigurationViewer/ConfigurationViewer";
import { useConfigurationData } from "components/pages/Configuration/useConfigurationData";
import { useValuesData } from "components/pages/Configuration/useValuesData";

function Configuration() {
  const { formatMessage } = useIntl();
  const { repositoryVcsId, configurationId } = useParams();
  const [showSecrets, setShowSecrets] = useState<boolean>(false);

  const {
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
  } = useConfigurationData(
    parseInt(repositoryVcsId as string),
    configurationId as string
  );

  const {
    contract,
    values,
    contractError,
    isLoadingContract,
    isFetchingContract,
    isLoadingValues,
    isFetchingValues,
    isSuccessValues,
  } = useValuesData(configuration, selectedEnvironment, selectedBranchName);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {isLoadingConfiguration && <LoadingBox sx={{ flex: 1 }} />}
      {!isLoadingConfiguration && configuration && (
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
                <>
                  <EnvironmentSelector
                    value={selectedEnvironment}
                    onChange={setSelectedEnvironment}
                    environments={environments}
                    repositoryVcsId={configuration.repository.vcsId}
                    configurationName={configuration.name}
                    configurationId={configuration.id}
                    isUserAdmin={isCurrentUserAdmin}
                  />
                  {meetRoleRequirement("admin", currentUserEnvironmentRole) && (
                    <EnvironmentSettingsButton
                      repositoryVcsId={configuration.repository.vcsId}
                      configurationId={configuration.id}
                      environment={selectedEnvironment}
                      sx={{
                        marginLeft: (theme) => theme.spacing(1),
                        width: "42px",
                      }}
                    />
                  )}
                  {meetRoleRequirement(
                    "readSecret",
                    currentUserEnvironmentRole
                  ) && (
                    <IconButton
                      onClick={() => setShowSecrets(!showSecrets)}
                      sx={{
                        marginLeft: (theme) => theme.spacing(1),
                        width: "42px",
                      }}
                    >
                      {showSecrets ? (
                        <VisibilityOutlinedIcon
                          sx={{ fontSize: "20px !important" }}
                        />
                      ) : (
                        <VisibilityOffOutlinedIcon
                          sx={{ fontSize: "20px !important" }}
                        />
                      )}
                    </IconButton>
                  )}
                </>
              )}
            </Box>
            <Box>
              {selectedBranchName && (
                <BranchSelector
                  value={selectedBranchName}
                  onChange={setSelectedBranchName}
                  branches={branches}
                />
              )}
            </Box>
          </Box>
          {selectedEnvironment &&
            meetRoleRequirement("write", currentUserEnvironmentRole) && (
              <ConfigurationEditor
                configuration={configuration}
                environment={selectedEnvironment}
                branch={selectedBranchName}
                showSecrets={showSecrets}
                sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
              />
            )}
          {selectedEnvironment &&
            !meetRoleRequirement("write", currentUserEnvironmentRole) && (
              <ConfigurationViewer
                configuration={configuration}
                environment={selectedEnvironment}
                branch={selectedBranchName}
                showSecrets={showSecrets}
                sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
              />
            )}
        </>
      )}
    </Box>
  );
}

export default Configuration;
