import React from "react";
import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type LoadingBoxProps = PropsWithSx & CircularProgressProps;

function LoadingBox({ sx, ...rest }: LoadingBoxProps) {
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
      <CircularProgress {...rest} />
    </Box>
  );
}

export default LoadingBox;
