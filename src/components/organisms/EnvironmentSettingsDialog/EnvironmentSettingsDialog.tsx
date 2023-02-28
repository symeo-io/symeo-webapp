import React from "react";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EnvironmentApiKeysSettings from "components/organisms/EnvironmentApiKeysSettings/EnvironmentApiKeysSettings";
import EnvironmentGeneralSettings from "components/organisms/EnvironmentGeneralSettings/EnvironmentGeneralSettings";
import { colors } from "theme/colors";
import EnvironmentDangerZoneSettings from "components/organisms/EnvironmentDangerZoneSettings/EnvironmentDangerZoneSettings";
import EnvironmentPermissionsSettings from "components/organisms/EnvironmentPermissionsSettings/EnvironmentPermissionsSettings";

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
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${colors.secondary.borders}`,
        }}
      >
        <SettingsOutlinedIcon
          sx={{ marginRight: (theme) => theme.spacing(1) }}
        />
        {formatMessage(
          {
            id: "environment-settings.title",
          },
          { environmentName: environment.name }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EnvironmentGeneralSettings
          repositoryVcsId={repositoryVcsId}
          configurationId={configurationId}
          environment={environment}
          sx={{
            marginTop: (theme) => theme.spacing(2),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
        <Divider />
        <EnvironmentPermissionsSettings
          repositoryVcsId={repositoryVcsId}
          configurationId={configurationId}
          environment={environment}
          sx={{
            marginTop: (theme) => theme.spacing(5),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
        <Divider />
        <EnvironmentApiKeysSettings
          repositoryVcsId={repositoryVcsId}
          configurationId={configurationId}
          environment={environment}
          sx={{
            marginTop: (theme) => theme.spacing(5),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
        <Divider />
        <EnvironmentDangerZoneSettings
          repositoryVcsId={repositoryVcsId}
          configurationId={configurationId}
          environment={environment}
          onDelete={handleClose}
          sx={{
            marginTop: (theme) => theme.spacing(5),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EnvironmentSettingsDialog;
