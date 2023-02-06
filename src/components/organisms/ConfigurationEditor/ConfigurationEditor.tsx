import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useGetConfigurationFormatQuery } from "redux/api/configurations/configurations.api";
import { PropsWithSx } from "types/PropsWithSx";
import {
  Configuration,
  Environment,
} from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { ConfigurationValues } from "redux/api/values/values.types";
import ConfigurationEditorProperty from "components/molecules/ConfigurationEditorProperty/ConfigurationEditorProperty";
import { cloneDeep } from "lodash";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";

export type ConfigurationEditorProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
};

function ConfigurationEditor({
  configuration,
  environment,
  sx,
}: ConfigurationEditorProps) {
  const { formatMessage } = useIntl();
  const [editorValues, setEditorValues] = useState<ConfigurationValues>({});

  const { data: configurationFormatData, isLoading: isLoadingFormat } =
    useGetConfigurationFormatQuery({
      configurationId: configuration.id,
      repositoryVcsId: configuration.repository.vcsId.toString(),
    });

  const {
    data: valuesData,
    isLoading: isLoadingValues,
    isFetching: isFetchingValue,
  } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId.toString(),
    environmentId: environment.id,
  });

  const format = useMemo(
    () => configurationFormatData?.format,
    [configurationFormatData?.format]
  );

  const values = useMemo(() => valuesData?.values, [valuesData?.values]);

  const reset = useCallback(
    () => values && setEditorValues(cloneDeep(values)),
    [values]
  );

  useEffect(() => {
    if (values) {
      setEditorValues(cloneDeep(values));
    }
  }, [values]);

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
        {(isLoadingFormat || isLoadingValues || isFetchingValue) && (
          <LoadingBox sx={{ flex: 1 }} />
        )}
        {!isLoadingFormat &&
          !isFetchingValue &&
          format &&
          values &&
          Object.keys(format).map((propertyName) => (
            <ConfigurationEditorProperty
              key={propertyName}
              propertyName={propertyName}
              property={format[propertyName]}
              values={editorValues}
              originalValues={values}
              setValues={setEditorValues}
            />
          ))}
      </Box>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          onClick={reset}
        >
          {formatMessage({ id: "configuration.reset" })}
        </Button>
        <Button>{formatMessage({ id: "configuration.save" })}</Button>
      </Box>
    </>
  );
}

export default ConfigurationEditor;
