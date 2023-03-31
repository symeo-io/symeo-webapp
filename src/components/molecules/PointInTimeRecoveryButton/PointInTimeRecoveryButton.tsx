import { PropsWithSx } from "types/PropsWithSx";
import HistoryIcon from "@mui/icons-material/History";
import { IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import EnvironmentPointInTimeRecoveryDialog from "components/organisms/EnvironmentPointInTimeRecoveryDialog/EnvironmentPointInTimeRecoveryDialog";

export type PointInTimeRecoveryButtonProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
};

function PointInTimeRecoveryButton({
  configuration,
  environment,
  sx,
}: PointInTimeRecoveryButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <IconButton
        onClick={handleOpenDialog}
        sx={{
          width: "42px",
          ...sx,
        }}
      >
        <HistoryIcon sx={{ fontSize: "20px !important" }} />
      </IconButton>
      <EnvironmentPointInTimeRecoveryDialog
        configuration={configuration}
        environment={environment}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default PointInTimeRecoveryButton;
