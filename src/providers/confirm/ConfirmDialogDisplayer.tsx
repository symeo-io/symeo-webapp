import { useIntl } from "react-intl";
import React, { useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { ConfirmDialogConfig } from "providers/confirm/ConfirmDialogContext";

export type ConfirmDialogDisplayerProps = {
  config: ConfirmDialogConfig | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function ConfirmDialogDisplayer({
  open,
  setOpen,
  config,
}: ConfirmDialogDisplayerProps) {
  const { formatMessage } = useIntl();
  const [isLoadingConfirm, setIsLoadingConfirm] =
    React.useState<boolean>(false);
  const [isLoadingCancel, setIsLoadingCancel] = React.useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleConfirm = useCallback(async () => {
    if (!config) return;

    setIsLoadingConfirm(true);
    await config.confirmButton.onClick();
    setIsLoadingConfirm(false);
    handleClose();
  }, [config, handleClose]);

  const handleCancel = useCallback(async () => {
    if (!config) return;

    if (config.cancelButton?.onClick) {
      setIsLoadingCancel(true);
      await config.cancelButton.onClick();
      setIsLoadingCancel(false);
    }

    handleClose();
  }, [config, handleClose]);

  if (!config) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{config.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{config.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color={config.cancelButton?.color}
          variant={config.cancelButton?.variant ?? "outlined"}
          loading={isLoadingCancel}
        >
          {config.cancelButton?.label
            ? config.cancelButton.label
            : formatMessage({ id: "confirm.cancel" })}
        </Button>
        <Button
          onClick={handleConfirm}
          color={config.confirmButton?.color}
          variant={config.confirmButton?.variant}
          loading={isLoadingConfirm}
        >
          {config.confirmButton.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialogDisplayer;
