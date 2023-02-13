import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationProperty } from "redux/api/configurations/configurations.types";
import { Box } from "@mui/material";
import React from "react";
import { colors } from "theme/colors";
import { getInputColorForProperty } from "components/molecules/ConfigurationEditorInput/utils";

export type ConfigurationEditorInputPlaceHolderProps = PropsWithSx & {
  property: ConfigurationProperty;
  value: unknown;
};

function ConfigurationEditorInputPlaceHolder({
  property,
  value,
  sx,
}: ConfigurationEditorInputPlaceHolderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        color: getInputColorForProperty(property),

        ...sx,
      }}
    >
      {!value && (
        <Box>
          <Box component="span" sx={{ opacity: "0.5" }}>
            {property.type}
          </Box>
          {!property.optional && (
            <>
              <Box component="span" sx={{ opacity: "0.5" }}>
                ,
              </Box>{" "}
              <Box
                component="span"
                sx={{ opacity: "0.7", color: colors.error.text }}
              >
                required
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ConfigurationEditorInputPlaceHolder;
