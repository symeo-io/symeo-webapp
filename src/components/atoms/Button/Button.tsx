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
        "& .MuiButton-startIcon": {
          visibility: loading ? "hidden" : undefined,
        },
        "& .MuiButton-endIcon": {
          visibility: loading ? "hidden" : undefined,
        },

        ...sx,
      }}
      {...props}
    >
      <Box
        component="span"
        className="MuiButton-content"
        sx={{ visibility: loading ? "hidden" : undefined, width: "100%" }}
      >
        {children}
      </Box>
      {loading && (
        <Box
          component="span"
          className="MuiButton-loader"
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
