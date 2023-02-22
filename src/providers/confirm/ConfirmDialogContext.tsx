import { ButtonProps } from "components/atoms/Button/Button";
import React from "react";

export type ConfirmDialogConfig = {
  title: string;
  message: string;
  confirmButton: {
    label: string;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    onClick: () => Promise<any>;
  };
  cancelButton?: {
    label?: string;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    onClick?: () => Promise<any>;
  };
};

export const ConfirmDialogContext = React.createContext<{
  config: ConfirmDialogConfig | null;
  setConfig: (config: ConfirmDialogConfig | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  config: null,
  setConfig: () => {},
  open: false,
  setOpen: () => {},
});
