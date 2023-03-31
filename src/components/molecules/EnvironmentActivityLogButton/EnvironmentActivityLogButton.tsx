import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { IconButton } from "@mui/material";
import React, { useCallback, useState } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import EnvironmentActivityLogDialog from "components/organisms/EnvironmentActivityLogDialog/EnvironmentActivityLogDialog";

export type EnvironmentActivityLogButtonProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
};
function EnvironmentActivityLogButton({
  configuration,
  environment,
  sx,
}: EnvironmentActivityLogButtonProps) {
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
        <DescriptionOutlinedIcon sx={{ fontSize: "20px !important" }} />
      </IconButton>
      <EnvironmentActivityLogDialog
        configuration={configuration}
        environment={environment}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default EnvironmentActivityLogButton;
