import React from "react";
import ConfigurationEditor from "components/organisms/ConfigurationEditor/ConfigurationEditor";
import { Environment } from "redux/api/environments/environments.types";
import {
  EnvironmentPermissionRole,
  meetRoleRequirement,
} from "redux/api/environment-permissions/environment-permissions.types";
import ConfigurationViewer from "components/organisms/ConfigurationViewer/ConfigurationViewer";
import ConfigurationToolBar from "components/organisms/ConfigurationToolBar/ConfigurationToolBar";
import { Configuration } from "redux/api/configurations/configurations.types";
import { useConfigurationEditor } from "hooks/useConfigurationEditor";

export type ConfigurationContentProps = {
  configuration: Configuration;
  environment: Environment;
  setEnvironment: (value: Environment) => void;
  branch: string;
  setBranch: (value: string) => void;
  isCurrentUserAdmin: boolean;
  currentUserEnvironmentRole?: EnvironmentPermissionRole;
};

function ConfigurationContent({
  configuration,
  environment,
  setEnvironment,
  branch,
  setBranch,
  isCurrentUserAdmin,
  currentUserEnvironmentRole,
}: ConfigurationContentProps) {
  const editor = useConfigurationEditor({
    configuration,
    environment,
    branch,
  });

  return (
    <>
      <ConfigurationToolBar
        configuration={configuration}
        environment={environment}
        setEnvironment={setEnvironment}
        isCurrentUserAdmin={isCurrentUserAdmin}
        currentUserEnvironmentRole={currentUserEnvironmentRole}
        branch={branch}
        setBranch={setBranch}
        editor={editor}
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      />
      {meetRoleRequirement("write", currentUserEnvironmentRole) && (
        <ConfigurationEditor
          configuration={configuration}
          branch={branch}
          editor={editor}
          sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
        />
      )}
      {!meetRoleRequirement("write", currentUserEnvironmentRole) && (
        <ConfigurationViewer
          configuration={configuration}
          branch={branch}
          editor={editor}
          sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
        />
      )}
    </>
  );
}

export default ConfigurationContent;
