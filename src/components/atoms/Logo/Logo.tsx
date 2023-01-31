import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";

export type LogoProps = PropsWithSx;

export function Logo({ sx }: LogoProps) {
  const { formatMessage } = useIntl();
  return (
    <Typography
      variant="h1"
      color="primary.text"
      sx={{
        fontFamily: "Poppins",
        fontWeight: 700,
        fontSize: "3rem",
        ...sx,
      }}
    >
      {formatMessage({ id: "name" })}
    </Typography>
  );
}

export default Logo;
