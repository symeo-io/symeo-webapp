import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationProperty } from "redux/api/configurations/configurations.types";
import { Box } from "@mui/material";
import React from "react";
import { getInputColorForProperty } from "components/molecules/ConfigurationEditorInput/utils";

export type ConfigurationViewerValueProps = PropsWithSx & {
  property: ConfigurationProperty;
  value: unknown;
  showSecrets?: boolean;
};

function ConfigurationViewerValue({
  property,
  value,
  showSecrets,
  sx,
}: ConfigurationViewerValueProps) {
  return (
    <Box
      sx={{
        width: "100%",
        color: getInputColorForProperty(property),
        marginLeft: (theme) => theme.spacing(1),
        fontSize: "16px",
        ...sx,
      }}
    >
      {!!value &&
        property.secret &&
        !showSecrets &&
        "*".repeat(value.toString().length)}
      {!!value &&
        (!property.secret || showSecrets) &&
        (value as boolean | number | string | undefined)?.toString()}
    </Box>
  );
}

export default ConfigurationViewerValue;
