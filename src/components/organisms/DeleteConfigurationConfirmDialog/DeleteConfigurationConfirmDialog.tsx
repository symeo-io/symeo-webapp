import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import { Configuration } from "redux/api/configurations/configurations.types";
import TextField from "components/molecules/TextField/TextField";
import { useDeleteGitHubConfigurationMutation } from "redux/api/configurations/configurations.api";

const CONFIRM_INPUT = "permanently delete";

export type DDeleteConfigurationConfirmDialogProps = PropsWithSx & {
  configuration: Configuration;
  open: boolean;
  handleClose: () => void;
  onDelete?: () => void;
};

function DeleteConfigurationConfirmDialog({
  configuration,
  open,
  handleClose,
  onDelete,
  sx,
}: DDeleteConfigurationConfirmDialogProps) {
  const { formatMessage } = useIntl();
  const [confirmInputValue, setConfirmInputValue] = useState<string>("");

  const [deleteConfiguration, { isLoading: isLoadingDelete }] =
    useDeleteGitHubConfigurationMutation();

  const handleDeleteConfiguration = useCallback(async () => {
    await deleteConfiguration({
      repositoryVcsId: configuration.repository.vcsId,
      configurationId: configuration.id,
    });

    handleClose();

    if (onDelete) {
      onDelete();
    }
  }, [deleteConfiguration, configuration.id, handleClose, onDelete]);

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage({
          id: "configuration-settings.danger-zone.delete.confirm.title",
        })}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          height: "150px",
          overflow: "auto",
        }}
      >
        <Typography variant="body2">
          <FormattedMessage
            id="configuration-settings.danger-zone.delete.confirm.message"
            values={{
              configurationName: configuration.name,
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: (theme) => theme.spacing(2) }}
        >
          <FormattedMessage
            id="configuration-settings.danger-zone.delete.confirm.confirm-input-message"
            values={{
              confirmInput: CONFIRM_INPUT,
              i: (chunks) => <i>{chunks}</i>,
            }}
          />
        </Typography>
        <TextField
          name="name"
          value={confirmInputValue}
          onChange={(event) => setConfirmInputValue(event.target.value)}
          fullWidth
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: (theme) => theme.spacing(3) }}>
        <Button
          color="error"
          disabled={confirmInputValue !== CONFIRM_INPUT}
          onClick={handleDeleteConfiguration}
          loading={isLoadingDelete}
          sx={{ width: "100%" }}
        >
          {formatMessage({
            id: "configuration-settings.danger-zone.delete.confirm.button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfigurationConfirmDialog;
