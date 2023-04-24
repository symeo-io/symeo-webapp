import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { PropsWithChildren } from "react";
import SvgIcon from "@mui/material/SvgIcon/SvgIcon";

export type InfoBoxProps = PropsWithSx &
  PropsWithChildren & {
    Icon?: typeof SvgIcon;
    color?: keyof typeof colors;
  };

function InfoBox({
  color = "secondary",
  Icon = InfoOutlinedIcon,
  children,
  sx,
}: InfoBoxProps) {
  return (
    <Box
      sx={{
        border: `1px solid ${colors[color].borders}`,
        borderRadius: "8px",
        backgroundColor: colors[color].surface,
        color: colors[color].text,
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          padding: (theme) => theme.spacing(1),
          paddingLeft: (theme) => theme.spacing(2),
        }}
      >
        <Icon sx={{ color: colors[color].text }} />
      </Box>
      <Box sx={{ padding: (theme) => theme.spacing(1) }}>{children}</Box>
    </Box>
  );
}

export default InfoBox;
