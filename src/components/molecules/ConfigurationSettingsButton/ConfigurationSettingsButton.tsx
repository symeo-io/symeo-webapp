import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import { colors } from "theme/colors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ConfigurationSettingsDialog from "components/organisms/ConfigurationSettingsDialog/ConfigurationSettingsDialog";

export type ConfigurationSettingsButtonProps = PropsWithSx & {
  configuration: Configuration;
};

function ConfigurationSettingsButton({
  configuration,
  sx,
}: ConfigurationSettingsButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Box
        onClick={handleOpenDialog}
        sx={{
          height: "32px",
          width: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

          "&:hover": {
            backgroundColor: colors.secondary.surfaceHover,
          },

          ...sx,
        }}
      >
        <SettingsOutlinedIcon
          sx={{ color: colors.secondary.textActive, fontSize: "24px" }}
        />
      </Box>
      <ConfigurationSettingsDialog
        configuration={configuration}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default ConfigurationSettingsButton;
