import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PropsWithSx } from "types/PropsWithSx";
import TextField from "components/molecules/TextField/TextField";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import { Link } from "react-router-dom";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import Button from "components/atoms/Button/Button";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";

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
  const { data: repositoriesData, isFetching } = useGetRepositoriesQuery();

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
        ...sx,
      }}
    >
      <TextField
        value={searchValue}
        onChange={handleSearchChange}
        sx={{ width: "320px", marginTop: 0 }}
        placeholder={formatMessage({
          id: "home.repositories.search-placeholder",
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {isFetching && <LoadingBox sx={{ height: "100px" }} />}
      {!isFetching && (
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
            }}
          >
            {formatMessage({
              id: "home.repositories.list-title",
            })}
          </Box>
          {repositories
            .filter((repository) =>
              repository.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((repository) => (
              <Box
                sx={{
                  display: "flex",
                  paddingX: (theme) => theme.spacing(2),
                  paddingY: (theme) => theme.spacing(2.5),
                  borderBottom: `4px solid ${colors.secondary.surfaceHover}`,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    "& a": {
                      lineHeight: "30px",
                      textDecoration: "none",
                      color: colors.primary.main,
                      fontWeight: 500,

                      "&:hover": {
                        textDecoration: "underline",
                      },
                    },
                  }}
                >
                  <Link to="">{repository.name}</Link>
                </Box>
                <Box>
                  {repository.configurationCount === 0 && (
                    <Button>
                      {formatMessage({
                        id: "home.repositories.setup",
                      })}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
}

export default RepositoryList;
