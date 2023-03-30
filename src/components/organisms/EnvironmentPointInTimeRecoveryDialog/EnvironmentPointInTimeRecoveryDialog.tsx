import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import HistoryIcon from "@mui/icons-material/History";
import { colors } from "theme/colors";
import { Configuration } from "redux/api/configurations/configurations.types";
import { useGetEnvironmentValuesVersionsQuery } from "redux/api/point-in-time-recovery/point-in-time-recovery.api";
import PointInTimeRecoveryVersion from "components/molecules/PointInTimeRecoveryVersion/PointInTimeRecoveryVersion";

export type EnvironmentPointInTimeRecoveryDialogProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  open: boolean;
  handleClose: () => void;
};

function EnvironmentPointInTimeRecoveryDialog({
  configuration,
  environment,
  open,
  handleClose,
  sx,
}: EnvironmentPointInTimeRecoveryDialogProps) {
  const { formatMessage } = useIntl();
  const { data: versionsData } = useGetEnvironmentValuesVersionsQuery({
    repositoryVcsId: configuration.repository.vcsId,
    configurationId: configuration.id,
    environmentId: environment.id,
  });
  const versions = useMemo(
    () => versionsData?.versions ?? [],
    [versionsData?.versions]
  );

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
            id: "environment-point-in-time-recovery.title",
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
        <Typography
          variant="body2"
          sx={{
            padding: (theme) => theme.spacing(2),
            borderBottom: `1px solid ${colors.secondary.borders}`,
          }}
        >
          {formatMessage(
            {
              id: "environment-point-in-time-recovery.sub-title",
            },
            { count: versions.length }
          )}
        </Typography>
        {versions.map((version) => (
          <PointInTimeRecoveryVersion
            key={version.versionId}
            configuration={configuration}
            environment={environment}
            version={version}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default EnvironmentPointInTimeRecoveryDialog;
