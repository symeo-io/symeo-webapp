import React from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import {
  Configuration,
  ConfigurationContract,
} from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import ConfigurationEditorProperty from "components/molecules/ConfigurationEditorProperty/ConfigurationEditorProperty";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import ConfigurationEditorDropZone from "components/molecules/ConfigurationEditorDropZone/ConfigurationEditorDropZone";
import { Editor } from "hooks/useConfigurationEditor";

export type ConfigurationEditorProps = PropsWithSx & {
  configuration: Configuration;
  branch: string;
  editor: Editor;
};

function ConfigurationEditor({
  configuration,
  branch,
  editor,
  sx,
}: ConfigurationEditorProps) {
  const { formatMessage } = useIntl();

  return (
    <>
      <ConfigurationEditorDropZone
        editor={editor}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          overflow: "hidden",

          ...sx,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#131626",
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
              <ConfigurationEditorProperty
                key={propertyName}
                propertyName={propertyName}
                property={
                  (editor.contract.value as ConfigurationContract)[propertyName]
                }
                editor={editor}
              />
            ))}
        </Box>
      </ConfigurationEditorDropZone>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
          paddingX: (theme) => theme.spacing(1),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          onClick={editor.reset}
          disabled={
            !editor.originalValues.isSuccess || editor.originalValues.isFetching
          }
        >
          {formatMessage({ id: "configuration.reset" })}
        </Button>
        <Button
          onClick={editor.save}
          loading={editor.isLoadingSave}
          disabled={
            !editor.originalValues.isSuccess || editor.originalValues.isFetching
          }
        >
          {formatMessage({ id: "configuration.save" })}
        </Button>
      </Box>
    </>
  );
}

export default ConfigurationEditor;
