import React from "react";
import {
  Box,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";

export type ButtonProps = MuiButtonProps & { loading?: boolean };

function Button({ loading, children, onClick, sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      onClick={!loading ? onClick : undefined}
      sx={{
        position: "relative",
        ...sx,
      }}
      {...props}
    >
      <Box component="span" sx={{ visibility: loading ? "hidden" : undefined }}>
        {children}
      </Box>
      {loading && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" size={14} />
        </Box>
      )}
    </MuiButton>
  );
}

export default Button;
