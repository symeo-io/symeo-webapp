import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import { colors } from "theme/colors";
import DeleteEnvironmentButton from "components/molecules/DeleteEnvironmentButton/DeleteEnvironmentButton";

export type EnvironmentDangerZoneSettingsProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
  onDelete?: () => void;
};

function EnvironmentDangerZoneSettings({
  repositoryVcsId,
  configurationId,
  environment,
  onDelete,
  sx,
}: EnvironmentDangerZoneSettingsProps) {
  const { formatMessage } = useIntl();

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3" sx={{ color: colors.error.text }}>
        {formatMessage(
          {
            id: "environment-settings.danger-zone.title",
          },
          { environmentName: environment.name }
        )}
      </Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          border: `1px solid ${colors.error.borders}`,
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            padding: (theme) => theme.spacing(2),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box flex={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {formatMessage({
                id: "environment-settings.danger-zone.delete.title",
              })}
            </Typography>
            <Typography>
              {formatMessage({
                id: "environment-settings.danger-zone.delete.message",
              })}
            </Typography>
          </Box>
          <DeleteEnvironmentButton
            repositoryVcsId={repositoryVcsId}
            configurationId={configurationId}
            environment={environment}
            onDelete={onDelete}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EnvironmentDangerZoneSettings;
