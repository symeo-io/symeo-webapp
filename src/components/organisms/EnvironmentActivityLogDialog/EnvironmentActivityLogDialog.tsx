import React, { useMemo } from "react";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { colors } from "theme/colors";
import { Configuration } from "redux/api/configurations/configurations.types";
import {
  useGetConfigurationActivityLogQuery,
  useGetEnvironmentActivityLogQuery,
} from "redux/api/activity-logs/activity-logs.api";
import ActivityLog, {
  ActivityLogType,
} from "components/molecules/ActivityLog/ActivityLog";
import dayjs from "dayjs";

export type EnvironmentActivityLogDialogProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  open: boolean;
  handleClose: () => void;
};

function EnvironmentActivityLogDialog({
  configuration,
  environment,
  open,
  handleClose,
  sx,
}: EnvironmentActivityLogDialogProps) {
  const { formatMessage } = useIntl();
  const { data: configurationActivityLogData } =
    useGetConfigurationActivityLogQuery({
      repositoryVcsId: configuration.repository.vcsId,
      configurationId: configuration.id,
    });
  const { data: environmentActivityLogData } =
    useGetEnvironmentActivityLogQuery({
      repositoryVcsId: configuration.repository.vcsId,
      configurationId: configuration.id,
      environmentId: environment.id,
    });

  const configurationActivityLogs = useMemo(
    () => configurationActivityLogData?.configurationAudits ?? [],
    [configurationActivityLogData?.configurationAudits]
  );
  const environmentActivityLogs = useMemo(
    () => environmentActivityLogData?.environmentAudits ?? [],
    [environmentActivityLogData?.environmentAudits]
  );

  const logs = useMemo(
    () =>
      [
        ...configurationActivityLogs.map((log) => ({
          log,
          type: "configuration" as ActivityLogType,
        })),
        ...environmentActivityLogs.map((log) => ({
          log,
          type: "environment" as ActivityLogType,
        })),
      ].sort((a, b) =>
        dayjs(b.log.createdAt).isAfter(a.log.createdAt) ? 1 : -1
      ),
    [configurationActivityLogs, environmentActivityLogs]
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
        <DescriptionOutlinedIcon
          sx={{ marginRight: (theme) => theme.spacing(1) }}
        />
        {formatMessage(
          {
            id: "environment-activity-log.title",
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
        <Box sx={{ paddingY: (theme) => theme.spacing(2) }}>
          {logs.map((logData, index) => (
            <>
              <ActivityLog
                log={logData.log}
                configuration={configuration}
                type={logData.type}
                last={index === logs.length - 1}
              />
            </>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EnvironmentActivityLogDialog;
