import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import { IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EnvironmentSettingsDialog from "components/organisms/EnvironmentSettingsDialog/EnvironmentSettingsDialog";
import React, { useCallback, useState } from "react";

export type EnvironmentSettingsButtonProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
};

function EnvironmentSettingsButton({
  repositoryVcsId,
  configurationId,
  environment,
  sx,
}: EnvironmentSettingsButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <IconButton
        onClick={handleOpenDialog}
        sx={{
          ...sx,
        }}
      >
        <SettingsOutlinedIcon sx={{ fontSize: "20px !important" }} />
      </IconButton>
      <EnvironmentSettingsDialog
        repositoryVcsId={repositoryVcsId}
        configurationId={configurationId}
        environment={environment}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default EnvironmentSettingsButton;
