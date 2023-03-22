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
import InternalLink from "components/atoms/InternalLink/InternalLink";
import ConfigurationListEmptyState from "components/organisms/ConfigurationListEmptyState/ConfigurationListEmptyState";

export type ConfigurationListProps = PropsWithSx;

function ConfigurationList({ sx }: ConfigurationListProps) {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    []
  );

  const { selectedOrganization } = useSelectedOrganization();
  const { data: repositoriesData, isLoading } = useGetRepositoriesQuery();

  const configurations = useMemo(
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
        })
        .flatMap((repository) => repository.configurations ?? []) ?? [],
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
      {isLoading && <LoadingBox sx={{ flex: 1 }} />}
      {!isLoading && configurations.length === 0 && (
        <ConfigurationListEmptyState
          sx={{ marginTop: (theme) => theme.spacing(5) }}
        />
      )}
      {!isLoading && configurations.length > 0 && (
        <>
          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            sx={{ width: "320px", marginTop: 0 }}
            placeholder={formatMessage({
              id: "configurations.search-placeholder",
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
                  id: "configurations.columns.configuration",
                })}
              </Box>
            </Box>
            {configurations
              .filter((configuration) =>
                configuration.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((configuration) => (
                <Box
                  key={configuration.id}
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
                    <InternalLink
                      to="configuration"
                      params={{
                        organizationName: configuration.owner.name,
                        repositoryVcsId: configuration.repository.vcsId,
                        configurationId: configuration.id,
                      }}
                      sx={{
                        textDecoration: "none",
                        color: colors.primary.text,

                        "&:hover": {
                          textDecoration: "underline",
                          color: colors.primary.textHover,
                        },
                      }}
                    >
                      {configuration.name}
                    </InternalLink>
                  </Box>
                </Box>
              ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default ConfigurationList;
