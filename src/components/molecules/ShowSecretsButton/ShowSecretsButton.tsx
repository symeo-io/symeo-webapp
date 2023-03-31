import React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { CircularProgress, IconButton } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import { Editor } from "hooks/useConfigurationEditor";

export type ShowSecretsButtonProps = PropsWithSx & {
  editor: Editor;
};
function ShowSecretsButton({ editor, sx }: ShowSecretsButtonProps) {
  return (
    <IconButton
      onClick={editor.toggleShowSecrets}
      sx={{
        width: "42px",
        height: "42px",
        background: "white",
        ...sx,
      }}
    >
      {editor.isLoadingShowSecrets && (
        <CircularProgress
          size={16}
          sx={{ color: colors.secondary.text, padding: "2px" }}
        />
      )}
      {!editor.isLoadingShowSecrets && editor.showSecrets && (
        <VisibilityOutlinedIcon sx={{ fontSize: "20px !important" }} />
      )}
      {!editor.isLoadingShowSecrets && !editor.showSecrets && (
        <VisibilityOffOutlinedIcon sx={{ fontSize: "20px !important" }} />
      )}
    </IconButton>
  );
}

export default ShowSecretsButton;
