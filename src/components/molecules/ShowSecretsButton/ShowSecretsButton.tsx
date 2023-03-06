import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton } from "@mui/material";
import React from "react";
import { PropsWithSx } from "types/PropsWithSx";

export type ShowSecretsButtonProps = PropsWithSx & {
  showSecrets: boolean;
  setShowSecrets: (value: boolean) => void;
};
function ShowSecretsButton({
  showSecrets,
  setShowSecrets,
  sx,
}: ShowSecretsButtonProps) {
  return (
    <IconButton
      onClick={() => setShowSecrets(!showSecrets)}
      sx={{
        width: "42px",
        ...sx,
      }}
    >
      {showSecrets ? (
        <VisibilityOutlinedIcon sx={{ fontSize: "20px !important" }} />
      ) : (
        <VisibilityOffOutlinedIcon sx={{ fontSize: "20px !important" }} />
      )}
    </IconButton>
  );
}

export default ShowSecretsButton;
