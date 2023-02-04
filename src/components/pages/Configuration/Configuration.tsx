import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useGetConfigurationQuery } from "redux/api/configurations/configurations.api";
import { useParams } from "react-router-dom";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";

function Configuration() {
  const { formatMessage } = useIntl();
  const { repositoryVcsId, configurationId } = useParams();

  const { data: configurationData, isLoading } = useGetConfigurationQuery(
    {
      configurationId: configurationId as string,
      repositoryVcsId: repositoryVcsId as string,
    },
    { skip: !repositoryVcsId || !configurationId }
  );

  const configuration = useMemo(
    () => configurationData?.configuration,
    [configurationData?.configuration]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLoading && <LoadingBox sx={{ height: "100px" }} />}
      {!isLoading && configuration && (
        <Box
          sx={{
            marginBottom: (theme) => theme.spacing(4),
            display: "flex",
            alignItems: "center",
          }}
        >
          <DataObjectIcon
            sx={{ marginRight: (theme) => theme.spacing(1), fontSize: "2rem" }}
          />
          <Typography variant="h1" sx={{ flex: 1 }}>
            {formatMessage(
              { id: "configuration.title" },
              {
                configurationName: configuration.name,
                repositoryName: configuration.repository.name,
              }
            )}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Configuration;
