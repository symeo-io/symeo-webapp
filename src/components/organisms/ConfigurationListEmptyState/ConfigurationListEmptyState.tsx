import { useCallback, useState } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import Button from "components/atoms/Button/Button";
import CreateConfigurationDialog from "components/organisms/CreateConfigurationDialog/CreateConfigurationDialog";

export type ConfigurationListEmptyStateProps = PropsWithSx;

function ConfigurationListEmptyState({ sx }: ConfigurationListEmptyStateProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
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
        <Button
          onClick={handleOpenDialog}
          sx={{ marginTop: (theme) => theme.spacing(3) }}
        >
          {formatMessage({ id: "configurations.empty-state.cta-label" })}
        </Button>
      </Box>
      <CreateConfigurationDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default ConfigurationListEmptyState;
