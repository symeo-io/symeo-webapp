import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { useIntl } from "react-intl";
import { Environment } from "redux/api/environments/environments.types";
import { colors } from "theme/colors";
import ConfigurationViewerProperty from "components/molecules/ConfigurationViewerProperty/ConfigurationViewerProperty";
import { ConfigurationValues } from "redux/api/values/values.types";

export type ConfigurationViewerProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  valuesWithSecrets: ConfigurationValues | undefined;
  branch?: string;
  showSecrets?: boolean;
};

function ConfigurationViewer({
  configuration,
  environment,
  valuesWithSecrets,
  branch,
  showSecrets = false,
  sx,
}: ConfigurationViewerProps) {
  const { formatMessage } = useIntl();
  const {
    data: configurationContractData,
    error: configurationContractError,
    isLoading: isLoadingContract,
    isFetching: isFetchingContract,
  } = useGetConfigurationContractQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    branch,
  });

  const {
    data: valuesData,
    isLoading: isLoadingValues,
    isFetching: isFetchingValues,
  } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    environmentId: environment.id,
  });

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  const values = useMemo(() => valuesData?.values, [valuesData?.values]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#131626",
          borderRadius: "8px",
          fontFamily: "Fira Mono",
          color: "#A06CE4",
          padding: (theme) => theme.spacing(3),
          paddingLeft: (theme) => theme.spacing(1),
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "18px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            padding: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "9999px",
            border: "6px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
          },

          ...sx,
        }}
      >
        {(isLoadingContract ||
          isFetchingContract ||
          isLoadingValues ||
          isFetchingValues) && <LoadingBox sx={{ flex: 1 }} />}
        {!isFetchingContract &&
          !isFetchingValues &&
          configurationContractError && (
            <Box
              sx={{
                color: colors.error.text,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {formatMessage(
                { id: "configuration.errors.contract-not-found" },
                {
                  filePath: configuration.contractFilePath,
                  branchName: branch ?? configuration.branch,
                }
              )}
            </Box>
          )}
        {!isFetchingContract &&
          !isFetchingValues &&
          !configurationContractError &&
          contract &&
          values &&
          Object.keys(contract).map((propertyName) => (
            <ConfigurationViewerProperty
              key={propertyName}
              propertyName={propertyName}
              property={contract[propertyName]}
              values={values}
              valuesWithSecrets={valuesWithSecrets}
              showSecrets={showSecrets}
            />
          ))}
      </Box>
    </>
  );
}

export default ConfigurationViewer;
