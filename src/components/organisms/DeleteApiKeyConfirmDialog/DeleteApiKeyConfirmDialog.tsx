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
import TextField from "components/molecules/TextField/TextField";
import { ApiKey } from "redux/api/api-keys/api-keys.types";
import { useDeleteApiKeyMutation } from "redux/api/api-keys/api-keys.api";

const CONFIRM_INPUT = "permanently delete";

export type DeleteApiKeyConfirmDialogProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  apiKey: ApiKey;
  open: boolean;
  handleClose: () => void;
};

function DeleteApiKeyConfirmDialog({
  repositoryVcsId,
  configurationId,
  environmentId,
  apiKey,
  open,
  handleClose,
  sx,
}: DeleteApiKeyConfirmDialogProps) {
  const { formatMessage } = useIntl();
  const [confirmInputValue, setConfirmInputValue] = useState<string>("");

  const [deleteApiKey, { isLoading: isLoadingDelete }] =
    useDeleteApiKeyMutation();

  const handleDeleteEnvironment = useCallback(async () => {
    await deleteApiKey({
      repositoryVcsId,
      configurationId,
      environmentId,
      apiKeyId: apiKey.id,
    });

    handleClose();
  }, [
    apiKey.id,
    configurationId,
    deleteApiKey,
    environmentId,
    handleClose,
    repositoryVcsId,
  ]);

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage({
          id: "environment-settings.api-keys.delete.confirm.title",
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
            id="environment-settings.api-keys.delete.confirm.message"
            values={{
              key: apiKey.hiddenKey,
              b: (chunks) => <b>{chunks}</b>,
            }}
          />
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: (theme) => theme.spacing(2) }}
        >
          <FormattedMessage
            id="environment-settings.api-keys.delete.confirm.confirm-input-message"
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
            id: "environment-settings.api-keys.delete.confirm.button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteApiKeyConfirmDialog;
