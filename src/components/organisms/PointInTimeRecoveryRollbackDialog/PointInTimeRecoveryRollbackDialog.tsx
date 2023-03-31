import { PropsWithSx } from "types/PropsWithSx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { colors } from "theme/colors";
import HistoryIcon from "@mui/icons-material/History";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { ValuesVersion } from "redux/api/point-in-time-recovery/point-in-time-recovery.types";
import dayjs from "dayjs";
import ConfigurationViewer from "components/organisms/ConfigurationViewer/ConfigurationViewer";
import { useConfigurationEditor } from "hooks/useConfigurationEditor";
import Button from "components/atoms/Button/Button";
import { useRollbackValuesForEnvironmentMutation } from "redux/api/values/values.api";
import ShowSecretsButton from "components/molecules/ShowSecretsButton/ShowSecretsButton";

export type PointInTimeRecoveryRollbackDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
  configuration: Configuration;
  environment: Environment;
  version: ValuesVersion;
  onRollback?: () => void;
};

function PointInTimeRecoveryRollbackDialog({
  open,
  handleClose,
  configuration,
  environment,
  version,
  onRollback,
  sx,
}: PointInTimeRecoveryRollbackDialogProps) {
  const { formatMessage } = useIntl();

  const editor = useConfigurationEditor({
    configuration,
    environment,
    branch: configuration.branch,
    versionId: version.versionId,
  });

  const [rollback, { isLoading }] = useRollbackValuesForEnvironmentMutation();

  const handleRollback = useCallback(async () => {
    await rollback({
      repositoryVcsId: configuration.repository.vcsId,
      configurationId: configuration.id,
      environmentId: environment.id,
      versionId: version.versionId,
    });
    handleClose();

    if (onRollback) {
      onRollback();
    }
  }, [
    configuration.id,
    configuration.repository.vcsId,
    environment.id,
    handleClose,
    rollback,
    version.versionId,
    onRollback,
  ]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={sx}
      PaperProps={{
        sx: {
          height: "calc(100vh - 100px)",
          maxHeight: "615px",
          width: "750px",
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
            date: dayjs(version.creationDate).format("YYYY/MM/DD HH:mm"),
          }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <ShowSecretsButton
          editor={editor}
          sx={{ position: "absolute", right: "42px", bottom: "32px" }}
        />
        <ConfigurationViewer
          configuration={configuration}
          branch={configuration.branch}
          editor={editor}
          sx={{ marginTop: (theme) => theme.spacing(1), flex: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
          {formatMessage({
            id: "environment-point-in-time-recovery.cancel-button-label",
          })}
        </Button>
        <Button onClick={handleRollback} loading={isLoading}>
          {formatMessage({
            id: "environment-point-in-time-recovery.rollback-confirm-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PointInTimeRecoveryRollbackDialog;
