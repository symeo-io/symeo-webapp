import { PropsWithSx } from "types/PropsWithSx";
import {
  ConfigurationContract,
  ConfigurationProperty,
} from "redux/api/configurations/configurations.types";
import React, { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import ConfigurationEditorInput from "components/molecules/ConfigurationEditorInput/ConfigurationEditorInput";
import {
  getObjectValueByPath,
  setObjectValueByPath,
  isModifiedByPath,
} from "components/molecules/ConfigurationEditorProperty/utils";
import { Editor } from "hooks/useConfigurationEditor";

function isConfigurationProperty(
  value: ConfigurationContract | ConfigurationProperty
) {
  return value.type && typeof value.type === "string";
}

export type ConfigurationEditorPropertyProps = PropsWithSx & {
  propertyName: string;
  property: ConfigurationContract | ConfigurationProperty;
  path?: string;
  editor: Editor;
};

function ConfigurationEditorProperty({
  propertyName,
  property,
  path = propertyName,
  editor,
  sx,
}: ConfigurationEditorPropertyProps) {
  const configurationProperty = useMemo(
    () => isConfigurationProperty(property),
    [property]
  );

  const isModified = useMemo(
    () =>
      configurationProperty &&
      isModifiedByPath(editor.values, editor.originalValues.value, path),
    [configurationProperty, editor.originalValues.value, editor.values, path]
  );

  const getValueByPath = useCallback(
    (path: string) => getObjectValueByPath(editor.values, path),
    [editor.values]
  );

  const getSecretValueByPath = useCallback(
    (path: string) =>
      editor.valuesWithSecrets
        ? getObjectValueByPath(editor.valuesWithSecrets, path)
        : undefined,
    [editor.valuesWithSecrets]
  );

  const setValueByPath = useCallback(
    (path: string, newValue: unknown) =>
      editor.setValues(setObjectValueByPath(editor.values, path, newValue)),
    [editor]
  );

  return (
    <Box
      sx={{
        marginLeft: (theme) => theme.spacing(2),
        display: configurationProperty ? "flex" : "block",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          height: "32px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <span>{propertyName}:</span>
        <Box
          sx={{
            opacity: isModified ? 1 : 0,
            transition: "opacity 0.3s",
            height: "4px",
            width: "4px",
            borderRadius: "50%",
            background: "orange",
            position: "absolute",
            top: "15px",
            left: "-8px",
          }}
        />
      </Box>
      {configurationProperty && (
        <ConfigurationEditorInput
          value={getValueByPath(path)}
          secretValue={getSecretValueByPath(path)}
          onChange={(newValue: unknown) => setValueByPath(path, newValue)}
          property={property as ConfigurationProperty}
          isModified={isModified}
          showSecrets={editor.showSecrets}
        />
      )}
      {!configurationProperty &&
        Object.keys(property).map((subPropertyName) => (
          <ConfigurationEditorProperty
            key={subPropertyName}
            propertyName={subPropertyName}
            property={(property as ConfigurationContract)[subPropertyName]}
            path={path + "." + subPropertyName}
            editor={editor}
            sx={sx}
          />
        ))}
    </Box>
  );
}

export default ConfigurationEditorProperty;
