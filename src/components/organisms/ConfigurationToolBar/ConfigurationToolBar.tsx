import React from "react";
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
import { useBranches } from "hooks/useBranches";
import EnvironmentActivityLogButton from "components/molecules/EnvironmentActivityLogButton/EnvironmentActivityLogButton";
import PointInTimeRecoveryButton from "components/molecules/PointInTimeRecoveryButton/PointInTimeRecoveryButton";
import { Editor } from "hooks/useConfigurationEditor";

export type ConfigurationToolBarProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  setEnvironment: (value: Environment) => void;
  branch: string;
  setBranch: (value: string) => void;
  editor: Editor;
  isCurrentUserAdmin: boolean;
  currentUserEnvironmentRole?: EnvironmentPermissionRole;
};

function ConfigurationToolBar({
  configuration,
  environment,
  setEnvironment,
  branch,
  setBranch,
  editor,
  isCurrentUserAdmin,
  currentUserEnvironmentRole,
  sx,
}: ConfigurationToolBarProps) {
  const { branches } = useBranches(configuration.repository.vcsId);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box sx={{ flex: 1, display: "flex" }}>
        <EnvironmentSelector
          value={environment}
          onChange={setEnvironment}
          environments={configuration.environments}
          repositoryVcsId={configuration.repository.vcsId}
          configurationName={configuration.name}
          configurationId={configuration.id}
          isUserAdmin={isCurrentUserAdmin}
        />
        {meetRoleRequirement("admin", currentUserEnvironmentRole) && (
          <EnvironmentSettingsButton
            repositoryVcsId={configuration.repository.vcsId}
            configurationId={configuration.id}
            environment={environment}
            sx={{
              marginLeft: (theme) => theme.spacing(1),
              width: "42px",
            }}
          />
        )}
        {meetRoleRequirement("readSecret", currentUserEnvironmentRole) && (
          <ShowSecretsButton
            editor={editor}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
        {meetRoleRequirement("readSecret", currentUserEnvironmentRole) && (
          <DownloadEnvironmentValuesButton
            editor={editor}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
        {meetRoleRequirement("write", currentUserEnvironmentRole) && (
          <UploadEnvironmentValuesButton
            editor={editor}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
        {meetRoleRequirement("write", currentUserEnvironmentRole) && (
          <PointInTimeRecoveryButton
            configuration={configuration}
            environment={environment}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        )}
        <EnvironmentActivityLogButton
          configuration={configuration}
          environment={environment}
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
        />
      </Box>
      <Box>
        <BranchSelector
          value={branch}
          onChange={setBranch}
          branches={branches}
        />
      </Box>
    </Box>
  );
}

export default ConfigurationToolBar;
