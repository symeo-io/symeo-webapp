import React, { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import { colors } from "theme/colors";
import { Color } from "theme/colors/color.type";
import { PropsWithSx } from "types/PropsWithSx";

export type StatusProps = PropsWithSx & {
  label: BoxProps["children"];
  variant?: "success" | "info" | "warning" | "error";
};

function getColor(variant: StatusProps["variant"]): Color {
  switch (variant) {
    case "info":
      return colors.primary;
    case "success":
      return colors.success;
    case "warning":
      return colors.warning;
    case "error":
      return colors.error;
    default:
      return colors.primary;
  }
}

function Status({ label, variant = "info", sx }: StatusProps) {
  const color = useMemo(() => getColor(variant), [variant]);

  return (
    <Box
      component="span"
      sx={{
        padding: "2px 4px",
        color: color.main,
        background: color.surface,
        border: `1px solid ${color.borders}`,
        borderRadius: "4px",
        fontWeight: 700,
        fontSize: "12px",
        ...sx,
      }}
    >
      {label}
    </Box>
  );
}

export default Status;
