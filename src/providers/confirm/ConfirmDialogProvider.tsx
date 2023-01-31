import React, { PropsWithChildren } from "react";
import ConfirmDialogDisplayer from "providers/confirm/ConfirmDialogDisplayer";
import {
  ConfirmDialogConfig,
  ConfirmDialogContext,
} from "providers/confirm/ConfirmDialogContext";

export type ConfirmDialogProviderProps = PropsWithChildren;

function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [config, setConfig] = React.useState<ConfirmDialogConfig | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <ConfirmDialogContext.Provider value={{ config, setConfig, open, setOpen }}>
      {children}
      <ConfirmDialogDisplayer open={open} setOpen={setOpen} config={config} />
    </ConfirmDialogContext.Provider>
  );
}

export default ConfirmDialogProvider;
