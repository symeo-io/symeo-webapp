import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

function Home() {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ flex: 1 }}>
          {formatMessage({ id: "home.title" })}
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
