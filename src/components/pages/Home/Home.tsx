import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import SourceIcon from "@mui/icons-material/Source";
import RepositoryList from "components/organisms/RepositoryList/RepositoryList";

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
        <SourceIcon
          sx={{ marginRight: (theme) => theme.spacing(1), fontSize: "2rem" }}
        />
        <Typography variant="h1" sx={{ flex: 1 }}>
          {formatMessage({ id: "home.title" })}
        </Typography>
      </Box>
      <RepositoryList />
    </Box>
  );
}

export default Home;
