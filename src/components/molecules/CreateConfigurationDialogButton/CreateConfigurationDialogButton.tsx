import React from "react";
import { Box, Typography } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import Button, { ButtonProps } from "components/atoms/Button/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "theme/colors";

export type CreateConfigurationDialogButtonProps = PropsWithSx & {
  title: React.ReactNode;
  message: React.ReactNode;
  onClick: ButtonProps["onClick"];
};

function CreateConfigurationDialogButton({
  title,
  message,
  onClick,
  sx,
}: CreateConfigurationDialogButtonProps) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        padding: (theme) => theme.spacing(2),
        "& .MuiButton-content": { display: "flex", alignItems: "center" },
        ...sx,
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          flex: 1,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: "20px", color: "black" }}>
          {title}
        </Typography>
        <Typography sx={{ marginTop: (theme) => theme.spacing(1) }}>
          {message}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.primary.main,
          color: "white",
          padding: (theme) => theme.spacing(1),
          borderRadius: "50%",
          marginLeft: (theme) => theme.spacing(3),
        }}
      >
        <ArrowForwardIcon />
      </Box>
    </Button>
  );
}

export default CreateConfigurationDialogButton;
