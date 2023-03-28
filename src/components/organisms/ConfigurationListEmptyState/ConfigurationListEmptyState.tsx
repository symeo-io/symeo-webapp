import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import CreateConfigurationButton from "components/molecules/CreateConfigurationButton/CreateConfigurationButton";

export type ConfigurationListEmptyStateProps = PropsWithSx;

function ConfigurationListEmptyState({ sx }: ConfigurationListEmptyStateProps) {
  const { formatMessage } = useIntl();

  return (
    <Box sx={{ textAlign: "center", ...sx }}>
      <Typography variant="h2">
        {formatMessage({ id: "configurations.empty-state.title" })}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: (theme) => theme.spacing(1) }}
      >
        {formatMessage({ id: "configurations.empty-state.message" })}
      </Typography>
      <CreateConfigurationButton
        sx={{ marginTop: (theme) => theme.spacing(3) }}
      >
        {formatMessage({ id: "configurations.empty-state.cta-label" })}
      </CreateConfigurationButton>
    </Box>
  );
}

export default ConfigurationListEmptyState;
