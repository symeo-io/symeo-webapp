import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import {
  useCreateApiKeyMutation,
  useGetApiKeysQuery,
} from "redux/api/api-keys/api-keys.api";
import { colors } from "theme/colors";
import dayjs from "dayjs";
import Button from "components/atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  ApiKey,
  CreateApiKeysResponse,
} from "redux/api/api-keys/api-keys.types";
import DeleteApiKeyButton from "components/molecules/DeleteApiKeyButton/DeleteApiKeyButton";
import CopyToClipboardButton from "components/molecules/CopyToClipboardButton/CopyToClipboardButton";

export type EnvironmentApiKeysSettingsProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
};

function EnvironmentApiKeysSettings({
  repositoryVcsId,
  configurationId,
  environment,
  sx,
}: EnvironmentApiKeysSettingsProps) {
  const { formatMessage } = useIntl();
  const [createdApiKey, setCreatedApiKey] = useState<ApiKey | undefined>(
    undefined
  );

  const [createApiKey, { isLoading: isLoadingCreate }] =
    useCreateApiKeyMutation();
  const { data: apiKeysData, isLoading: isLoadingApiKeys } = useGetApiKeysQuery(
    {
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
    }
  );

  const apiKeys = useMemo(
    () =>
      (apiKeysData &&
        [...apiKeysData.apiKeys].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )) ??
      [],
    [apiKeysData]
  );

  const handleNewKey = useCallback(async () => {
    const response = (await createApiKey({
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
    })) as { data: CreateApiKeysResponse };

    setCreatedApiKey(response.data.apiKey);
  }, [configurationId, createApiKey, environment.id, repositoryVcsId]);

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3">
        {formatMessage(
          {
            id: "environment-settings.api-keys.title",
          },
          { environmentName: environment.name }
        )}
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginTop: (theme) => theme.spacing(1) }}
      >
        {formatMessage({
          id: "environment-settings.api-keys.message",
        })}
      </Typography>
      <TableContainer
        sx={{
          marginTop: (theme) => theme.spacing(2),
          border: `1px solid ${colors.secondary.borders}`,
          borderRadius: "4px",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              padding: (theme) => theme.spacing(1),
              borderBottom: `1px solid ${colors.secondary.borders}`,
            },
            "& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root":
              {
                borderBottom: 0,
              },
          }}
        >
          <TableHead
            sx={{
              "& .MuiTableCell-root.MuiTableCell-head": {
                fontWeight: 500,
                fontSize: "14px",
                textTransform: "uppercase",
              },
            }}
          >
            <TableRow>
              <TableCell>
                {formatMessage({
                  id: "environment-settings.api-keys.table.key-column-label",
                })}
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                {formatMessage({
                  id: "environment-settings.api-keys.table.created-on-column-label",
                })}
              </TableCell>
              <TableCell sx={{ width: "5%" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow
                key={apiKey.id}
                sx={{
                  "& .MuiTableCell-root": {
                    backgroundColor:
                      createdApiKey?.id === apiKey.id
                        ? colors.success.surface
                        : undefined,
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      {createdApiKey?.id === apiKey.id
                        ? createdApiKey.key
                        : apiKey.hiddenKey}
                    </Box>
                    {createdApiKey?.id === apiKey.id && (
                      <CopyToClipboardButton
                        contentToCopy={createdApiKey?.key}
                        sx={{ marginLeft: (theme) => theme.spacing(1) }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {dayjs(apiKey.createdAt).format("MMM D, YYYY, h:mm a")}
                </TableCell>
                <TableCell>
                  <DeleteApiKeyButton
                    repositoryVcsId={repositoryVcsId}
                    configurationId={configurationId}
                    environmentId={environment.id}
                    apiKey={apiKey}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!isLoadingApiKeys && apiKeys.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ padding: (theme) => theme.spacing(2) }}>
                    {formatMessage({
                      id: "environment-settings.api-keys.table.empty-state",
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {isLoadingApiKeys && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      padding: (theme) => theme.spacing(2),
                      height: "24px",
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          loading={isLoadingCreate}
          onClick={handleNewKey}
        >
          {formatMessage({
            id: "environment-settings.api-keys.new-key-button-label",
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default EnvironmentApiKeysSettings;
