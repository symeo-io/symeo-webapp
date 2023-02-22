import {
  ConfirmDialogConfig,
  ConfirmDialogContext,
} from "providers/confirm/ConfirmDialogContext";
import { useContext } from "react";

export function useConfirm(config: ConfirmDialogConfig) {
  const { setConfig, setOpen, open } = useContext(ConfirmDialogContext);

  const handleOpen = () => {
    setConfig(config);
    setOpen(true);
  };

  const handleClose = () => {
    setConfig(null);
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
}
