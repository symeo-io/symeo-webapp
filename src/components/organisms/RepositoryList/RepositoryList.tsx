import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PropsWithSx } from "types/PropsWithSx";
import TextField from "components/molecules/TextField/TextField";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import AddConfigurationButton from "components/molecules/AddConfigurationButton/AddConfigurationButton";
import ConfigurationLink from "components/molecules/ConfigurationLink/ConfigurationLink";

export type RepositoryListProps = PropsWithSx;

function RepositoryList({ sx }: RepositoryListProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    []
  );

  const { selectedOrganization } = useSelectedOrganization();
  const { data: repositoriesData, isLoading } = useGetRepositoriesQuery();

  const repositories = useMemo(
    () =>
      repositoriesData?.repositories
        .filter(
          (repository) => repository.owner.vcsId === selectedOrganization?.vcsId
        )
        .sort((a, b) => {
          return (
            new Date(b.pushedAt ?? "").getTime() -
            new Date(a.pushedAt ?? "").getTime()
          );
        }) ?? [],
    [repositoriesData?.repositories, selectedOrganization?.vcsId]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <TextField
        value={searchValue}
        onChange={handleSearchChange}
        sx={{ width: "320px", marginTop: 0 }}
        placeholder={formatMessage({
          id: "projects.repositories.search-placeholder",
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {isLoading && <LoadingBox sx={{ flex: 1 }} />}
      {!isLoading && (
        <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
          <Box
            sx={{
              paddingX: (theme) => theme.spacing(2),
              paddingY: (theme) => theme.spacing(0.5),
              backgroundColor: colors.secondary.surfaceHover,
              color: colors.secondary.text,
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: "1rem",
              display: "grid",
              gridTemplateColumns: "250px 1fr 150px",
            }}
          >
            <Box>
              {formatMessage({
                id: "projects.repositories.columns.repository",
              })}
            </Box>
            <Box>
              {formatMessage({
                id: "projects.repositories.columns.configurations",
              })}
            </Box>
            <Box>
              {formatMessage({
                id: "projects.repositories.columns.actions",
              })}
            </Box>
          </Box>
          {repositories
            .filter((repository) =>
              repository.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((repository) => (
              <Box
                key={repository.vcsId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "250px 1fr 150px",
                  paddingX: (theme) => theme.spacing(2),
                  paddingY: (theme) => theme.spacing(2.5),
                  borderBottom: `4px solid ${colors.secondary.surfaceHover}`,
                }}
              >
                <Box
                  sx={{
                    lineHeight: "30px",
                    color: colors.primary.text,
                    fontWeight: 500,
                  }}
                >
                  {repository.name}
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {repository.configurations?.map((configuration) => (
                    <ConfigurationLink
                      sx={{ margin: (theme) => theme.spacing(0.5) }}
                      key={configuration.id}
                      configuration={configuration}
                      isUserAdmin={repository.isCurrentUserAdmin}
                    />
                  ))}
                </Box>
                <Box>
                  <AddConfigurationButton repository={repository} />
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
}

export default RepositoryList;
