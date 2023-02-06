import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useGetConfigurationFormatQuery } from "redux/api/configurations/configurations.api";
import { PropsWithSx } from "types/PropsWithSx";
import {
  Configuration,
  ConfigurationFormat,
  ConfigurationProperty,
  Environment,
} from "redux/api/configurations/configurations.types";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import ConfigurationEditorInput from "components/molecules/ConfigurationEditorInput/ConfigurationEditorInput";
import {
  getObjectValueByPath,
  setObjectValueByPath,
} from "components/organisms/ConfigurationEditor/utils";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { ConfigurationValues } from "redux/api/values/values.types";

function isConfigurationProperty(
  value: ConfigurationFormat | ConfigurationProperty
) {
  return value.type && typeof value.type === "string";
}

function buildFormatInput(
  property: ConfigurationFormat | ConfigurationProperty,
  getValueByPath: (path: string) => unknown,
  setValueByPath: (path: string, value: unknown) => void,
  tab: number = 0,
  path: string = ""
) {
  if (isConfigurationProperty(property)) {
    return (
      <Box
        sx={{
          marginLeft: (theme) => theme.spacing(1),
          height: "32px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ConfigurationEditorInput
          value={getValueByPath(path)}
          onChange={(newValue: unknown) => setValueByPath(path, newValue)}
          property={property as ConfigurationProperty}
        />
      </Box>
    );
  }

  const format = property as ConfigurationFormat;
  return Object.keys(format).map((key) => {
    const newPath = path !== "" ? path + "." + key : key;
    return (
      <Box
        key={key}
        sx={{
          marginLeft: (theme) => theme.spacing(tab * 2),
          display: isConfigurationProperty(format[key]) ? "flex" : "block",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "32px", display: "flex", alignItems: "center" }}>
          {key}:
        </Box>
        {buildFormatInput(
          format[key],
          getValueByPath,
          setValueByPath,
          tab + 1,
          newPath
        )}
      </Box>
    );
  });
}

export type ConfigurationEditorProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
};

function ConfigurationEditor({
  configuration,
  environment,
  sx,
}: ConfigurationEditorProps) {
  const [editorValues, setEditorValues] = useState<ConfigurationValues>({});

  const getValueByPath = useCallback(
    (path: string) => getObjectValueByPath(editorValues, path),
    [editorValues]
  );

  const setValueByPath = useCallback(
    (path: string, newValue: unknown) =>
      setEditorValues(setObjectValueByPath(editorValues, path, newValue)),
    [editorValues]
  );

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

  useEffect(() => {
    if (values) {
      setEditorValues(values);
    }
  }, [values]);

  return (
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
        buildFormatInput(format, getValueByPath, setValueByPath)}
    </Box>
  );
}

export default ConfigurationEditor;
