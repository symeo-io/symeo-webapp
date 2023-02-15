import { PropsWithSx } from "types/PropsWithSx";
import {
  ConfigurationFormat,
  ConfigurationProperty,
} from "redux/api/configurations/configurations.types";
import React, { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import ConfigurationEditorInput from "components/molecules/ConfigurationEditorInput/ConfigurationEditorInput";
import { ConfigurationValues } from "redux/api/values/values.types";
import {
  getObjectValueByPath,
  setObjectValueByPath,
  isModifiedByPath,
} from "components/molecules/ConfigurationEditorProperty/utils";

function isConfigurationProperty(
  value: ConfigurationFormat | ConfigurationProperty
) {
  return value.type && typeof value.type === "string";
}

export type ConfigurationEditorPropertyProps = PropsWithSx & {
  propertyName: string;
  property: ConfigurationFormat | ConfigurationProperty;
  path?: string;
  values: ConfigurationValues;
  setValues: (values: ConfigurationValues) => void;
  originalValues: ConfigurationValues;
};

function ConfigurationEditorProperty({
  propertyName,
  property,
  path = propertyName,
  values,
  setValues,
  originalValues,
  sx,
}: ConfigurationEditorPropertyProps) {
  const configurationProperty = useMemo(
    () => isConfigurationProperty(property),
    [property]
  );

  const isModified = useMemo(
    () =>
      configurationProperty && isModifiedByPath(values, originalValues, path),
    [configurationProperty, originalValues, path, values]
  );

  const getValueByPath = useCallback(
    (path: string) => getObjectValueByPath(values, path),
    [values]
  );

  const setValueByPath = useCallback(
    (path: string, newValue: unknown) =>
      setValues(setObjectValueByPath(values, path, newValue)),
    [setValues, values]
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
          onChange={(newValue: unknown) => setValueByPath(path, newValue)}
          property={property as ConfigurationProperty}
        />
      )}
      {!configurationProperty &&
        Object.keys(property).map((subPropertyName) => (
          <ConfigurationEditorProperty
            key={subPropertyName}
            propertyName={subPropertyName}
            property={(property as ConfigurationFormat)[subPropertyName]}
            path={path + "." + subPropertyName}
            values={values}
            setValues={setValues}
            originalValues={originalValues}
            sx={sx}
          />
        ))}
    </Box>
  );
}

export default ConfigurationEditorProperty;
