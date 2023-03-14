import { PropsWithSx } from "types/PropsWithSx";
import {
  ConfigurationContract,
  ConfigurationProperty,
} from "redux/api/configurations/configurations.types";
import React, { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { ConfigurationValues } from "redux/api/values/values.types";
import { getObjectValueByPath } from "components/molecules/ConfigurationEditorProperty/utils";
import ConfigurationViewerValue from "components/molecules/ConfigurationViewerValue/ConfigurationViewerValue";

function isConfigurationProperty(
  value: ConfigurationContract | ConfigurationProperty
) {
  return value.type && typeof value.type === "string";
}

export type ConfigurationViewerPropertyProps = PropsWithSx & {
  propertyName: string;
  property: ConfigurationContract | ConfigurationProperty;
  path?: string;
  values: ConfigurationValues;
  valuesWithSecrets: ConfigurationValues | undefined;
  showSecrets?: boolean;
};

function ConfigurationViewerProperty({
  propertyName,
  property,
  path = propertyName,
  values,
  valuesWithSecrets,
  showSecrets = false,
  sx,
}: ConfigurationViewerPropertyProps) {
  const configurationProperty = useMemo(
    () => isConfigurationProperty(property),
    [property]
  );

  const getValueByPath = useCallback(
    (path: string) => getObjectValueByPath(values, path),
    [values]
  );

  const getSecretValueByPath = useCallback(
    (path: string) =>
      valuesWithSecrets
        ? getObjectValueByPath(valuesWithSecrets, path)
        : undefined,
    [valuesWithSecrets]
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
      </Box>
      {configurationProperty && (
        <ConfigurationViewerValue
          value={getValueByPath(path)}
          secretValue={getSecretValueByPath(path)}
          property={property as ConfigurationProperty}
          showSecrets={showSecrets}
        />
      )}
      {!configurationProperty &&
        Object.keys(property).map((subPropertyName) => (
          <ConfigurationViewerProperty
            key={subPropertyName}
            propertyName={subPropertyName}
            property={(property as ConfigurationContract)[subPropertyName]}
            path={path + "." + subPropertyName}
            values={values}
            valuesWithSecrets={valuesWithSecrets}
            showSecrets={showSecrets}
            sx={sx}
          />
        ))}
    </Box>
  );
}

export default ConfigurationViewerProperty;
