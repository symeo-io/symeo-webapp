import React, { PropsWithChildren, useCallback } from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationContract } from "redux/api/configurations/configurations.types";
import { ConfigurationValues } from "redux/api/values/values.types";
import { useDropzone } from "react-dropzone";
import YAML from "yamljs";
import { initializeConfig } from "services/contract/contract.utils";
import { merge } from "lodash";
import { useIntl } from "react-intl";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { colors } from "theme/colors";

export type ConfigurationEditorDropZoneProps = PropsWithSx &
  PropsWithChildren & {
    editorValues: ConfigurationValues;
    setEditorValues: (values: ConfigurationValues) => void;
    contract?: ConfigurationContract;
  };

function ConfigurationEditorDropZone({
  editorValues,
  setEditorValues,
  contract,
  children,
  sx,
}: ConfigurationEditorDropZoneProps) {
  const { formatMessage } = useIntl();

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = async (readerEvent) => {
          const yamlString = readerEvent.target?.result;
          if (typeof yamlString === "string" && contract) {
            const values = YAML.parse(yamlString);
            setEditorValues(
              initializeConfig(contract, merge(editorValues, values))
            );
          }
        };
        reader.readAsText(files[0]);
      }
    },
    [contract, editorValues, setEditorValues]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/x-yaml": [".yml", ".yaml"] },
    maxFiles: 1,
    noClick: true,
  });

  return (
    <Box {...getRootProps()} sx={{ position: "relative", ...sx }}>
      <input {...getInputProps()} />
      <Box
        sx={{
          opacity: isDragActive ? 1 : 0,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: isDragActive ? "none" : "unset",
          userSelect: "none",
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: colors.secondary.shape,
        }}
      >
        <Box>
          <FileUploadOutlinedIcon sx={{ fontSize: "2.5rem" }} />
        </Box>
        <Box sx={{ marginTop: (theme) => theme.spacing(1) }}>
          {formatMessage({ id: "configuration.dropzone.message" })}
        </Box>
      </Box>
      {children}
    </Box>
  );
}

export default ConfigurationEditorDropZone;
