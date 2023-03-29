import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import {
  ConfigurationAudit,
  EnvironmentAudit,
} from "redux/api/activity-logs/activity-logs.types";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { colors } from "theme/colors";
import { FormattedMessage } from "react-intl";
import { Configuration } from "redux/api/configurations/configurations.types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyIcon from "@mui/icons-material/Key";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export type ActivityLogType = "configuration" | "environment";

const logIcons: Record<ActivityLogType, Record<string, typeof AddIcon>> = {
  configuration: {
    created: AddIcon,
    updated: EditIcon,
    deleted: DeleteIcon,
  },
  environment: {
    created: AddIcon,
    updated: EditIcon,
    deleted: DeleteIcon,
    permissionUpdated: ManageAccountsIcon,
    apiKeyCreated: KeyIcon,
    apiKeyDeleted: KeyOffIcon,
    valuesUpdated: FileUploadOutlinedIcon,
    secretsRead: RemoveRedEyeOutlinedIcon,
  },
};

export type ActivityLogProps = PropsWithSx & {
  configuration: Configuration;
  log: ConfigurationAudit | EnvironmentAudit;
  type: ActivityLogType;
  last?: boolean;
};

function ActivityLog({
  type,
  log,
  configuration,
  last = false,
  sx,
}: ActivityLogProps) {
  const Icon = logIcons[type][log.eventType] ?? QuestionMarkIcon;

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: "40px",
            minHeight: "40px",
            width: "40px",
            minWidth: "40px",
            border: `1px solid ${colors.secondary.borders}`,
            background: colors.secondary.surface,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon />
        </Box>
        {!last && (
          <Box
            sx={{
              flex: 1,
              width: "1px",
              backgroundColor: colors.secondary.borders,
              marginLeft: "20px",
            }}
          />
        )}
      </Box>
      <Box
        sx={{ marginLeft: (theme) => theme.spacing(2), marginBottom: "28px" }}
      >
        <Typography sx={{ fontWeight: 500, color: colors.secondary.text }}>
          {dayjs(log.createdAt).format("YYYY/MM/DD, HH:mm")}
        </Typography>
        <Typography variant="body2">
          <FormattedMessage
            id={`environment-activity-log.${type}-events.${log.eventType}`}
            values={{
              b: (chunks) => <b>{chunks}</b>,
              user: (chunks) => (
                <b style={{ color: colors.primary.text }}>{chunks}</b>
              ),
              ...log.metadata.metadata,
              logUsername: log.userName,
              repositoryName: configuration.repository.name,
              updatedProperties: (log.metadata.metadata as any)
                .updatedProperties
                ? (log.metadata.metadata as any).updatedProperties.join(", ")
                : undefined,
              readProperties: (log.metadata.metadata as any).readProperties
                ? (log.metadata.metadata as any).readProperties.join(", ")
                : undefined,
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}

export default ActivityLog;
