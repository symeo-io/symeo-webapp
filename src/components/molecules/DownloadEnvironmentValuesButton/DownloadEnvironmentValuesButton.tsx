import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton } from "@mui/material";
import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Editor } from "hooks/useConfigurationEditor";

export type DownloadEnvironmentValuesButtonProps = PropsWithSx & {
  editor: Editor;
};

function DownloadEnvironmentValuesButton({
  editor,
  sx,
}: DownloadEnvironmentValuesButtonProps) {
  return (
    <IconButton
      onClick={editor.download}
      sx={{
        width: "42px",
        ...sx,
      }}
    >
      <FileDownloadOutlinedIcon sx={{ fontSize: "20px !important" }} />
    </IconButton>
  );
}

export default DownloadEnvironmentValuesButton;
