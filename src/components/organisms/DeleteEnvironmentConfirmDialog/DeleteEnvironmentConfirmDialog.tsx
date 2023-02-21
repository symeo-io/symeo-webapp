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
import { Environment } from "redux/api/environments/environments.types";
import TextField from "components/molecules/TextField/TextField";
import { useDeleteEnvironmentMutation } from "redux/api/environments/environments.api";

const CONFIRM_INPUT = "permanently delete";

export type DeleteEnvironmentConfirmDialogProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
  open: boolean;
  handleClose: () => void;
  onDelete?: () => void;
};

function DeleteEnvironmentConfirmDialog({
  repositoryVcsId,
  configurationId,
  environment,
  open,
  handleClose,
  onDelete,
  sx,
}: DeleteEnvironmentConfirmDialogProps) {
  const { formatMessage } = useIntl();
  const [confirmInputValue, setConfirmInputValue] = useState<string>("");

  const [deleteEnvironment, { isLoading: isLoadingDelete }] =
    useDeleteEnvironmentMutation();

  const handleDeleteEnvironment = useCallback(async () => {
    await deleteEnvironment({
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
    });

    handleClose();

    if (onDelete) {
      onDelete();
    }
  }, [
    configurationId,
    deleteEnvironment,
    environment.id,
    handleClose,
    onDelete,
    repositoryVcsId,
  ]);

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage({
          id: "environment-settings.danger-zone.delete.confirm.title",
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
            id="environment-settings.danger-zone.delete.confirm.message"
            values={{
              environmentName: environment.name,
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: (theme) => theme.spacing(2) }}
        >
          <FormattedMessage
            id="environment-settings.danger-zone.delete.confirm.confirm-input-message"
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
          onClick={handleDeleteEnvironment}
          loading={isLoadingDelete}
          sx={{ width: "100%" }}
        >
          {formatMessage({
            id: "environment-settings.danger-zone.delete.confirm.button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEnvironmentConfirmDialog;
