import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationProperty } from "redux/api/configurations/configurations.types";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { getInputColorForProperty } from "components/molecules/ConfigurationEditorInput/utils";

export type ConfigurationViewerValueProps = PropsWithSx & {
  property: ConfigurationProperty;
  value: unknown;
  secretValue: unknown;
  showSecrets?: boolean;
};

function ConfigurationViewerValue({
  property,
  value,
  secretValue,
  showSecrets,
  sx,
}: ConfigurationViewerValueProps) {
  const valueToDisplay = useMemo(
    () => (property.secret && showSecrets && secretValue ? secretValue : value),
    [property.secret, secretValue, showSecrets, value]
  );

  return (
    <Box
      sx={{
        width: "100%",
        color: getInputColorForProperty(property),
        marginLeft: (theme) => theme.spacing(1),
        fontSize: "14px",
        ...sx,
      }}
    >
      {!!valueToDisplay &&
        (valueToDisplay as boolean | number | string | undefined)?.toString()}
    </Box>
  );
}

export default ConfigurationViewerValue;
