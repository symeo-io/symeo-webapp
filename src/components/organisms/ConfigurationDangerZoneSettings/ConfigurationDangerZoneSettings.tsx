import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import DeleteConfigurationButton from "components/molecules/DeleteConfigurationButton/DeleteConfigurationButton";
import { Configuration } from "redux/api/configurations/configurations.types";

export type ConfigurationDangerZoneSettingsProps = PropsWithSx & {
  configuration: Configuration;
  onDelete?: () => void;
};

function ConfigurationDangerZoneSettings({
  configuration,
  onDelete,
  sx,
}: ConfigurationDangerZoneSettingsProps) {
  const { formatMessage } = useIntl();

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3" sx={{ color: colors.error.text }}>
        {formatMessage(
          {
            id: "configuration-settings.danger-zone.title",
          },
          { configurationName: configuration.name }
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
                id: "configuration-settings.danger-zone.delete.title",
              })}
            </Typography>
            <Typography>
              {formatMessage({
                id: "configuration-settings.danger-zone.delete.message",
              })}
            </Typography>
          </Box>
          <DeleteConfigurationButton
            configuration={configuration}
            onDelete={onDelete}
            sx={{ marginLeft: (theme) => theme.spacing(1) }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ConfigurationDangerZoneSettings;
