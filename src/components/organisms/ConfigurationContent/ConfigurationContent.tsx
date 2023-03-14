import React, { useState } from "react";
import ConfigurationEditor from "components/organisms/ConfigurationEditor/ConfigurationEditor";
import { Environment } from "redux/api/environments/environments.types";
import {
  EnvironmentPermissionRole,
  meetRoleRequirement,
} from "redux/api/environment-permissions/environment-permissions.types";
import ConfigurationViewer from "components/organisms/ConfigurationViewer/ConfigurationViewer";
import { ConfigurationValues } from "redux/api/values/values.types";
import ConfigurationToolBar from "components/organisms/ConfigurationToolBar/ConfigurationToolBar";
import { Configuration } from "redux/api/configurations/configurations.types";

export type ConfigurationContentProps = {
  configuration: Configuration;
  isCurrentUserAdmin: boolean;
  currentUserEnvironmentRole?: EnvironmentPermissionRole;
  selectedEnvironment?: Environment;
  setSelectedEnvironment: (value: Environment) => void;
};

function ConfigurationContent({
  configuration,
  isCurrentUserAdmin,
  currentUserEnvironmentRole,
  selectedEnvironment,
  setSelectedEnvironment,
}: ConfigurationContentProps) {
  const [selectedBranchName, setSelectedBranchName] = useState<
    string | undefined
  >(undefined);
  const [showSecrets, setShowSecrets] = useState<boolean>(false);
  const [editorValues, setEditorValues] = useState<ConfigurationValues>({});
  const [valuesWithSecrets, setValuesWithSecrets] = useState<
    ConfigurationValues | undefined
  >(undefined);

  return (
    <>
      <ConfigurationToolBar
        configuration={configuration}
        selectedEnvironment={selectedEnvironment}
        setSelectedEnvironment={setSelectedEnvironment}
        showSecrets={showSecrets}
        setShowSecrets={setShowSecrets}
        isCurrentUserAdmin={isCurrentUserAdmin}
        currentUserEnvironmentRole={currentUserEnvironmentRole}
        selectedBranchName={selectedBranchName}
        setSelectedBranchName={setSelectedBranchName}
        editorValues={editorValues}
        setEditorValues={setEditorValues}
        valuesWithSecrets={valuesWithSecrets}
        setValuesWithSecrets={setValuesWithSecrets}
        sx={{
          marginTop: (theme) => theme.spacing(2),
        }}
      />
      {selectedEnvironment &&
        meetRoleRequirement("write", currentUserEnvironmentRole) && (
          <ConfigurationEditor
            editorValues={editorValues}
            valuesWithSecrets={valuesWithSecrets}
            setEditorValues={setEditorValues}
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
            valuesWithSecrets={valuesWithSecrets}
            configuration={configuration}
            environment={selectedEnvironment}
            branch={selectedBranchName}
            showSecrets={showSecrets}
            sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
          />
        )}
    </>
  );
}

export default ConfigurationContent;
