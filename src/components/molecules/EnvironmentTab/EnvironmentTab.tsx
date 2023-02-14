import { Box, BoxProps } from "@mui/material";
import { Environment } from "redux/api/environments/environments.types";
import { PropsWithSx } from "types/PropsWithSx";
import { colors, environmentsColorPalettes } from "theme/colors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EnvironmentSettingsDialog from "components/organisms/EnvironmentSettingsDialog/EnvironmentSettingsDialog";
import { useCallback, useState } from "react";

export type EnvironmentTabProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
  active?: boolean;
  onClick?: BoxProps["onClick"];
};
function EnvironmentTab({
  repositoryVcsId,
  configurationId,
  environment,
  onClick,
  active = false,
  sx,
}: EnvironmentTabProps) {
  const colorKey = environment.color as keyof typeof environmentsColorPalettes;
  const palette = environmentsColorPalettes[colorKey];

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

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
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

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
      <Box
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDialog();
        }}
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          height: "24px",
          width: "24px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <SettingsOutlinedIcon sx={{ fontSize: "18px" }} />
      </Box>
      <EnvironmentSettingsDialog
        repositoryVcsId={repositoryVcsId}
        configurationId={configurationId}
        environment={environment}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </Box>
  );
}

export default EnvironmentTab;
