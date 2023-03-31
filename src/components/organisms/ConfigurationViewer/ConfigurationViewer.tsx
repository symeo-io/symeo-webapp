import React from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import {
  Configuration,
  ConfigurationContract,
} from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import ConfigurationViewerProperty from "components/molecules/ConfigurationViewerProperty/ConfigurationViewerProperty";
import { Editor } from "hooks/useConfigurationEditor";

export type ConfigurationViewerProps = PropsWithSx & {
  configuration: Configuration;
  branch?: string;
  editor: Editor;
};

function ConfigurationViewer({
  configuration,
  editor,
  branch,
  sx,
}: ConfigurationViewerProps) {
  const { formatMessage } = useIntl();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#131626",
          borderRadius: "8px",
          fontFamily: "Fira Mono",
          color: "#A06CE4",
          padding: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(1),
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "18px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            padding: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "9999px",
            border: "6px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
          },

          ...sx,
        }}
      >
        {(editor.contract.isFetching || editor.originalValues.isFetching) && (
          <LoadingBox sx={{ flex: 1 }} />
        )}
        {!editor.contract.isFetching &&
          !editor.originalValues.isFetching &&
          editor.contract.error && (
            <Box
              sx={{
                color: colors.error.text,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {formatMessage(
                { id: "configuration.errors.contract-not-found" },
                {
                  filePath: configuration.contractFilePath,
                  branchName: branch ?? configuration.branch,
                }
              )}
            </Box>
          )}
        {!editor.contract.isFetching &&
          !editor.originalValues.isFetching &&
          !editor.contract.error &&
          editor.contract.value &&
          editor.originalValues.value &&
          Object.keys(editor.contract.value).map((propertyName) => (
            <ConfigurationViewerProperty
              key={propertyName}
              propertyName={propertyName}
              property={
                (editor.contract.value as ConfigurationContract)[propertyName]
              }
              editor={editor}
            />
          ))}
      </Box>
    </>
  );
}

export default ConfigurationViewer;
