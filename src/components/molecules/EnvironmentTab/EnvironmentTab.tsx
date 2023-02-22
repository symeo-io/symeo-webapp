import { Box } from "@mui/material";
import { Environment } from "redux/api/environments/environments.types";
import { PropsWithSx } from "types/PropsWithSx";
import { environmentsColorPalettes } from "theme/colors";

export type EnvironmentTabProps = PropsWithSx & {
  environment: Environment;
  selected?: boolean;
};
function EnvironmentTab({
  environment,
  selected = false,
  sx,
}: EnvironmentTabProps) {
  const colorKey = environment.color as keyof typeof environmentsColorPalettes;
  const palette =
    environmentsColorPalettes[colorKey] ?? environmentsColorPalettes.blue;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
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
      <Box
        sx={{
          fontWeight: selected ? 500 : 400,
          fontSize: "16px",
        }}
      >
        {environment.name}
      </Box>
    </Box>
  );
}

export default EnvironmentTab;
