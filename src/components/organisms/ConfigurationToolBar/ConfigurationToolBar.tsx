import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import EnvironmentSelector from "components/molecules/EnvironmentSelector/EnvironmentSelector";
import { Environment } from "redux/api/environments/environments.types";
import EnvironmentSettingsButton from "components/molecules/EnvironmentSettingsButton/EnvironmentSettingsButton";
import BranchSelector from "components/molecules/BranchSelector/BranchSelector";
import {
  EnvironmentPermissionRole,
  meetRoleRequirement,
} from "redux/api/environment-permissions/environment-permissions.types";
import ShowSecretsButton from "components/molecules/ShowSecretsButton/ShowSecretsButton";
import DownloadEnvironmentValuesButton from "components/molecules/DownloadEnvironmentValuesButton/DownloadEnvironmentValuesButton";
import UploadEnvironmentValuesButton from "components/molecules/UploadEnvironmentValuesButton/UploadEnvironmentValuesButton";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import { ConfigurationValues } from "redux/api/values/values.types";
import { useBranches } from "hooks/useBranches";
import EnvironmentActivityLogButton from "components/molecules/EnvironmentActivityLogButton/EnvironmentActivityLogButton";

export type ConfigurationToolBarProps = PropsWithSx & {
  configuration: Configuration;
  selectedEnvironment?: Environment;
  setSelectedEnvironment: (value: Environment) => void;
  showSecrets: boolean;
  setShowSecrets: (value: boolean) => void;
  isCurrentUserAdmin: boolean;
  currentUserEnvironmentRole?: EnvironmentPermissionRole;
  selectedBranchName?: string;
  setSelectedBranchName: (value: string) => void;
  editorValues: ConfigurationValues;
  setEditorValues: (values: ConfigurationValues) => void;
  valuesWithSecrets: ConfigurationValues | undefined;
  setValuesWithSecrets: (values: ConfigurationValues) => void;
};

function ConfigurationToolBar({
  configuration,
  selectedEnvironment,
  setSelectedEnvironment,
  showSecrets,
  setShowSecrets,
  isCurrentUserAdmin,
  currentUserEnvironmentRole,
  selectedBranchName,
  setSelectedBranchName,
  editorValues,
  setEditorValues,
  valuesWithSecrets,
  setValuesWithSecrets,
  sx,
}: ConfigurationToolBarProps) {
  const { branches } = useBranches(configuration.repository.vcsId);

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
      setSelectedEnvironment(environments[0]);
    }
  }, [
    configuration,
    selectedEnvironment,
    setSelectedEnvironment,
    environments,
  ]);

  useEffect(() => {
    if (configuration && !selectedBranchName) {
      setSelectedBranchName(configuration.branch);
    }
  }, [configuration, selectedBranchName, setSelectedBranchName]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
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
            {meetRoleRequirement("readSecret", currentUserEnvironmentRole) && (
              <ShowSecretsButton
                configuration={configuration}
                environment={selectedEnvironment}
                showSecrets={showSecrets}
                setShowSecrets={setShowSecrets}
                valuesWithSecrets={valuesWithSecrets}
                setValuesWithSecrets={setValuesWithSecrets}
                selectedBranchName={selectedBranchName}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
            )}
            {meetRoleRequirement("readSecret", currentUserEnvironmentRole) && (
              <DownloadEnvironmentValuesButton
                configuration={configuration}
                environment={selectedEnvironment}
                branch={selectedBranchName}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
            )}
            {meetRoleRequirement("write", currentUserEnvironmentRole) && (
              <UploadEnvironmentValuesButton
                editorValues={editorValues}
                setEditorValues={setEditorValues}
                configuration={configuration}
                branch={selectedBranchName}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
            )}
            {meetRoleRequirement("admin", currentUserEnvironmentRole) && (
              <EnvironmentActivityLogButton
                configuration={configuration}
                environment={selectedEnvironment}
                sx={{ marginLeft: (theme) => theme.spacing(1) }}
              />
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
  );
}

export default ConfigurationToolBar;
