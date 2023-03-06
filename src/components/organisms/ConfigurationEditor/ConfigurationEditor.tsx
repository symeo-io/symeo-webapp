import React, { useCallback, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import {
  useGetValuesForEnvironmentQuery,
  useSetValuesForEnvironmentMutation,
} from "redux/api/values/values.api";
import { ConfigurationValues } from "redux/api/values/values.types";
import ConfigurationEditorProperty from "components/molecules/ConfigurationEditorProperty/ConfigurationEditorProperty";
import { cloneDeep } from "lodash";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { Environment } from "redux/api/environments/environments.types";
import { colors } from "theme/colors";
import { initializeConfig } from "services/contract/contract.utils";
import ConfigurationEditorDropZone from "components/molecules/ConfigurationEditorDropZone/ConfigurationEditorDropZone";

export type ConfigurationEditorProps = PropsWithSx & {
  editorValues: ConfigurationValues;
  setEditorValues: (values: ConfigurationValues) => void;
  configuration: Configuration;
  environment: Environment;
  branch?: string;
  showSecrets?: boolean;
};

function ConfigurationEditor({
  editorValues,
  setEditorValues,
  configuration,
  environment,
  branch,
  showSecrets = false,
  sx,
}: ConfigurationEditorProps) {
  const { formatMessage } = useIntl();
  const [setValues, { isLoading: isLoadingSetValues }] =
    useSetValuesForEnvironmentMutation();

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
    isSuccess: isSuccessValues,
  } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    environmentId: environment.id,
  });

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  const values = useMemo(
    () =>
      valuesData?.values &&
      contract &&
      initializeConfig(contract, valuesData.values),
    [contract, valuesData]
  );

  const reset = useCallback(
    () => values && setEditorValues(cloneDeep(values)),
    [setEditorValues, values]
  );

  const save = useCallback(async () => {
    if (isSuccessValues && !isFetchingValues) {
      setValues({
        configurationId: configuration.id,
        repositoryVcsId: configuration.repository.vcsId,
        environmentId: environment.id,
        values: editorValues,
      });
    }
  }, [
    configuration.id,
    configuration.repository.vcsId,
    editorValues,
    environment.id,
    isFetchingValues,
    isSuccessValues,
    setValues,
  ]);

  useEffect(() => {
    if (values) {
      setEditorValues(cloneDeep(values));
    }
  }, [setEditorValues, values]);

  return (
    <>
      <ConfigurationEditorDropZone
        editorValues={editorValues}
        setEditorValues={setEditorValues}
        contract={contract}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          overflow: "hidden",

          ...sx,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#131626",
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
              <ConfigurationEditorProperty
                key={propertyName}
                propertyName={propertyName}
                property={contract[propertyName]}
                values={editorValues}
                originalValues={values}
                setValues={setEditorValues}
                showSecrets={showSecrets}
              />
            ))}
        </Box>
      </ConfigurationEditorDropZone>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
          paddingX: (theme) => theme.spacing(1),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          onClick={reset}
          disabled={!isSuccessValues || isFetchingValues}
        >
          {formatMessage({ id: "configuration.reset" })}
        </Button>
        <Button
          onClick={save}
          loading={isLoadingSetValues}
          disabled={!isSuccessValues || isFetchingValues}
        >
          {formatMessage({ id: "configuration.save" })}
        </Button>
      </Box>
    </>
  );
}

export default ConfigurationEditor;
