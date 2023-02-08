import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/configurations/configurations.types";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EnvironmentApiKeysSettings from "components/organisms/EnvironmentApiKeysSettings/EnvironmentApiKeysSettings";

export type EnvironmentSettingsDialogProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
  open: boolean;
  handleClose: () => void;
};

function EnvironmentSettingsDialog({
  repositoryVcsId,
  configurationId,
  environment,
  open,
  handleClose,
  sx,
}: EnvironmentSettingsDialogProps) {
  const { formatMessage } = useIntl();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={sx}
      PaperProps={{
        sx: {
          height: "calc(100vh - 100px)",
          maxHeight: "715px",
          width: "1150px",
          maxWidth: "calc(100vw - 100px)",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <SettingsOutlinedIcon
          sx={{ marginRight: (theme) => theme.spacing(1) }}
        />
        <Typography variant="h2">
          {formatMessage(
            {
              id: "environment-settings.title",
            },
            { environmentName: environment.name }
          )}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EnvironmentApiKeysSettings
          repositoryVcsId={repositoryVcsId}
          configurationId={configurationId}
          environment={environment}
          sx={{
            marginTop: (theme) => theme.spacing(2),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
        <Divider />
      </DialogContent>
    </Dialog>
  );
}

export default EnvironmentSettingsDialog;
