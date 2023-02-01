import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import SourceIcon from "@mui/icons-material/Source";
import RepositoryList from "components/organisms/RepositoryList/RepositoryList";
import { Repository } from "redux/api/repositories/repositories.types";

const mockRepositories: Repository[] = [
  {
    name: "symeo-api",
    owner: { name: "symeo-io", vcsId: 12, avatarUrl: "" },
    pushedAt: "string",
    vcsType: "string",
    vcsUrl: "string",
  },
  {
    name: "symeo-webapp",
    owner: { name: "symeo-io", vcsId: 12, avatarUrl: "" },
    pushedAt: "string",
    vcsType: "string",
    vcsUrl: "string",
    configurationId: "string",
  },
  {
    name: "symeo-js",
    owner: { name: "symeo-io", vcsId: 12, avatarUrl: "" },
    pushedAt: "string",
    vcsType: "string",
    vcsUrl: "string",
  },
];

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
      <RepositoryList repositories={mockRepositories} />
    </Box>
  );
}

export default Home;
