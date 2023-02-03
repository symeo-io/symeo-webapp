import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { colors } from "theme/colors";

export type LoadingMessageProps = PropsWithSx & {
  loading: boolean;
  success: boolean;
  loadingLabel: string;
  successLabel: string;
  errorLabel: string;
};

function LoadingMessage({
  loading,
  success,
  successLabel,
  loadingLabel,
  errorLabel,
  sx,
}: LoadingMessageProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      {loading && (
        <CircularProgress
          size={14}
          sx={{ marginRight: (theme) => theme.spacing(1) }}
        />
      )}
      {!loading && success && (
        <CheckCircleRoundedIcon
          sx={{
            marginRight: (theme) => theme.spacing(1),
            fontSize: "18px",
            color: colors.success.main,
          }}
        />
      )}
      {!loading && !success && (
        <ErrorRoundedIcon
          sx={{
            marginRight: (theme) => theme.spacing(1),
            fontSize: "18px",
            color: colors.warning.main,
          }}
        />
      )}
      <Typography sx={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.5 }}>
        {loading && loadingLabel}
        {!loading && success && successLabel}
        {!loading && !success && errorLabel}
      </Typography>
    </Box>
  );
}

export default LoadingMessage;
