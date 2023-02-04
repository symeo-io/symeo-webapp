import { Box, BoxProps } from "@mui/material";
import { Environment } from "redux/api/configurations/configurations.types";
import { PropsWithSx } from "types/PropsWithSx";
import { colors, environmentsColorPalettes } from "theme/colors";

export type EnvironmentTabProps = PropsWithSx & {
  environment: Environment;
  active?: boolean;
  onClick?: BoxProps["onClick"];
};
function EnvironmentTab({
  environment,
  onClick,
  active = false,
  sx,
}: EnvironmentTabProps) {
  const colorKey = environment.color as keyof typeof environmentsColorPalettes;
  const palette = environmentsColorPalettes[colorKey];

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: active
          ? colors.secondary.borders
          : colors.secondary.surface,
        paddingY: (theme) => theme.spacing(1.5),
        paddingX: (theme) => theme.spacing(2),
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        cursor: onClick ? "pointer" : "inherit",

        "&:hover":
          !active && onClick
            ? {
                backgroundColor: colors.secondary.surfaceHover,
              }
            : undefined,

        ...sx,
      }}
    >
      <Box
        sx={{
          height: "12px",
          width: "12px",
          borderRadius: "50%",
          background: palette[700],
          marginRight: (theme) => theme.spacing(1),
        }}
      />
      <Box>{environment.name}</Box>
    </Box>
  );
}

export default EnvironmentTab;
