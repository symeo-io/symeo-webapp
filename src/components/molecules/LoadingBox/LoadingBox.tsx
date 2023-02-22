import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type LoadingBoxProps = PropsWithSx;

function LoadingBox({ sx }: LoadingBoxProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingBox;
