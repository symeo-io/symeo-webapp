import { PropsWithSx } from "types/PropsWithSx";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { colors } from "theme/colors";
import HistoryIcon from "@mui/icons-material/History";
import React from "react";
import { useIntl } from "react-intl";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { ValuesVersion } from "redux/api/point-in-time-recovery/point-in-time-recovery.types";
import dayjs from "dayjs";
import ConfigurationViewer from "components/organisms/ConfigurationViewer/ConfigurationViewer";
import { useConfigurationEditor } from "hooks/useConfigurationEditor";

export type PointInTimeRecoveryRollbackDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
  configuration: Configuration;
  environment: Environment;
  version: ValuesVersion;
};

function PointInTimeRecoveryRollbackDialog({
  open,
  handleClose,
  configuration,
  environment,
  version,
  sx,
}: PointInTimeRecoveryRollbackDialogProps) {
  const { formatMessage } = useIntl();

  const editor = useConfigurationEditor({
    configuration,
    environment,
    branch: configuration.branch,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={sx}
      PaperProps={{
        sx: {
          height: "calc(100vh - 100px)",
          maxHeight: "715px",
          width: "950px",
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
        <HistoryIcon sx={{ marginRight: (theme) => theme.spacing(1) }} />
        {formatMessage(
          {
            id: "environment-point-in-time-recovery.rollback.title",
          },
          {
            environmentName: environment.name,
            date: dayjs(version.creationDate).format("YYYY/MM/DD, HH:mm"),
          }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ConfigurationViewer
          configuration={configuration}
          branch={configuration.branch}
          editor={editor}
          sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PointInTimeRecoveryRollbackDialog;
