import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export type TextFieldProps = MuiTextFieldProps;

function TextField({ ...props }: TextFieldProps) {
  return <MuiTextField {...props} />;
}

export default TextField;
