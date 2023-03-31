import { PropsWithSx } from "types/PropsWithSx";
import React from "react";
import { Box, Typography } from "@mui/material";
import { ValuesVersion } from "redux/api/point-in-time-recovery/point-in-time-recovery.types";
import dayjs from "dayjs";
import { colors } from "theme/colors";
import PointInTimeRecoveryRollbackButton from "components/molecules/PointInTimeRecoveryRollbackButton/PointInTimeRecoveryRollbackButton";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";

export type PointInTimeRecoveryVersionProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  version: ValuesVersion;
  current?: boolean;
  onRollback?: () => void;
};

function PointInTimeRecoveryVersion({
  configuration,
  environment,
  version,
  current = false,
  onRollback,
  sx,
}: PointInTimeRecoveryVersionProps) {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: `1px solid ${colors.secondary.borders}`,
        paddingX: (theme) => theme.spacing(2),
        paddingY: (theme) => theme.spacing(3),
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

        "&:hover": {
          backgroundColor: colors.secondary.surface,
        },
        ...sx,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 500 }}>
          {dayjs(version.creationDate).format("YYYY/MM/DD HH:mm")}
        </Typography>
      </Box>
      <Box>
        <PointInTimeRecoveryRollbackButton
          configuration={configuration}
          environment={environment}
          version={version}
          current={current}
          onRollback={onRollback}
        />
      </Box>
    </Box>
  );
}

export default PointInTimeRecoveryVersion;
