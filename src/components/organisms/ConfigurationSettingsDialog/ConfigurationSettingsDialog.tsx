import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { colors } from "theme/colors";
import { Configuration } from "redux/api/configurations/configurations.types";
import ConfigurationGeneralSettings from "components/organisms/ConfigurationGeneralSettings/ConfigurationGeneralSettings";

export type ConfigurationSettingsDialogProps = PropsWithSx & {
  configuration: Configuration;
  open: boolean;
  handleClose: () => void;
};

function ConfigurationSettingsDialog({
  configuration,
  open,
  handleClose,
  sx,
}: ConfigurationSettingsDialogProps) {
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
            id: "configuration-settings.title",
          },
          { configurationName: configuration.name }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ConfigurationGeneralSettings
          configuration={configuration}
          sx={{
            marginTop: (theme) => theme.spacing(2),
            marginBottom: (theme) => theme.spacing(2),
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ConfigurationSettingsDialog;
