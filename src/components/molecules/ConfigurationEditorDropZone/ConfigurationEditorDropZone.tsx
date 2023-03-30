import React, { PropsWithChildren, useCallback } from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { useDropzone } from "react-dropzone";
import { useIntl } from "react-intl";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { colors } from "theme/colors";
import { Editor } from "hooks/useConfigurationEditor";

export type ConfigurationEditorDropZoneProps = PropsWithSx &
  PropsWithChildren & {
    editor: Editor;
  };

function ConfigurationEditorDropZone({
  editor,
  children,
  sx,
}: ConfigurationEditorDropZoneProps) {
  const { formatMessage } = useIntl();

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) {
        editor.upload(files[0]);
      }
    },
    [editor]
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
          pointerEvents: isDragActive ? "unset" : "none",
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
