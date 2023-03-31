import React, { useCallback, useEffect, useState } from "react";
import { ConfigurationValues } from "redux/api/values/values.types";
import {
  useLazyGetValuesForEnvironmentWithSecretsQuery,
  useSetValuesForEnvironmentMutation,
} from "redux/api/values/values.api";
import { useContract } from "components/pages/Configuration/useContract";
import { useValues } from "components/pages/Configuration/useValues";
import { cloneDeep, merge } from "lodash";
import { buildModifiedValuesObject } from "components/molecules/ConfigurationEditorProperty/utils";
import {
  Configuration,
  ConfigurationContract,
} from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  initializeConfig,
  toYamlString,
} from "services/contract/contract.utils";
import { saveAs } from "file-saver";
import YAML from "yamljs";

export type UseConfigurationEditorInput = {
  configuration: Configuration;
  environment: Environment;
  branch?: string;
  versionId?: string;
};

export type Editor = {
  values: ConfigurationValues;
  setValues: React.Dispatch<React.SetStateAction<ConfigurationValues>>;
  valuesWithSecrets: ConfigurationValues | undefined;
  showSecrets: boolean;
  toggleShowSecrets: () => Promise<void>;
  isLoadingShowSecrets: boolean;
  originalValues: {
    value: ConfigurationValues | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
  };
  contract: {
    value: ConfigurationContract | undefined;
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };
  reset: () => void;
  save: () => Promise<void>;
  isLoadingSave: boolean;
  download: () => void;
  upload: (file: File) => void;
};

function buildFileName(
  configuration: Configuration,
  environment: Environment
): string {
  return `${configuration.name
    .toLowerCase()
    .replace(" ", "-")}-${environment.name
    .toLowerCase()
    .replace(" ", "-")}.yml`;
}

export function useConfigurationEditor({
  configuration,
  environment,
  branch,
  versionId,
}: UseConfigurationEditorInput): Editor {
  const [showSecrets, setShowSecrets] = useState<boolean>(false);
  const [values, setValues] = useState<ConfigurationValues>({});
  const [valuesWithSecrets, setValuesWithSecrets] = useState<
    ConfigurationValues | undefined
  >(undefined);

  const [saveValues, { isLoading: isLoadingSave }] =
    useSetValuesForEnvironmentMutation();
  const [fetchValuesWithSecrets, { isLoading: isLoadingShowSecrets }] =
    useLazyGetValuesForEnvironmentWithSecretsQuery();

  const toggleShowSecrets = useCallback(async () => {
    if (!showSecrets && !valuesWithSecrets) {
      const { data } = await fetchValuesWithSecrets({
        configurationId: configuration.id,
        repositoryVcsId: configuration.repository.vcsId,
        environmentId: environment.id,
        branch,
        versionId,
      });

      if (data) {
        setValuesWithSecrets(data.values);
      }
    }

    setShowSecrets(!showSecrets);
  }, [
    showSecrets,
    valuesWithSecrets,
    fetchValuesWithSecrets,
    configuration.id,
    configuration.repository.vcsId,
    environment.id,
    branch,
    versionId,
  ]);

  const {
    contract,
    error: contractError,
    isLoading: isLoadingContract,
    isFetching: isFetchingContract,
  } = useContract({
    configuration,
    branch,
  });

  const {
    values: originalValues,
    isLoading: isLoadingOriginalValues,
    isFetching: isFetchingOriginalValues,
    isSuccess: isSuccessOriginalValues,
  } = useValues({
    configuration,
    environment,
    contract,
    branch,
    versionId,
  });

  const reset = useCallback(
    () => values && setValues(cloneDeep(values)),
    [setValues, values]
  );

  const save = useCallback(async () => {
    if (
      isSuccessOriginalValues &&
      !isFetchingOriginalValues &&
      !isLoadingSave
    ) {
      const valuesToSave = buildModifiedValuesObject(values, originalValues);

      saveValues({
        configurationId: configuration.id,
        repositoryVcsId: configuration.repository.vcsId,
        environmentId: environment.id,
        values: valuesToSave,
      });
    }
  }, [
    isSuccessOriginalValues,
    isFetchingOriginalValues,
    isLoadingSave,
    values,
    originalValues,
    saveValues,
    configuration.id,
    configuration.repository.vcsId,
    environment.id,
  ]);

  const download = useCallback(() => {
    if (values && contract) {
      const blob = new Blob([toYamlString(contract, values)], {
        type: "application/x-yaml;charset=utf-8",
      });
      saveAs(blob, buildFileName(configuration, environment));
    }
  }, [configuration, contract, environment, values]);

  const upload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = async (readerEvent) => {
        const yamlString = readerEvent.target?.result;
        if (typeof yamlString === "string" && contract) {
          const values = YAML.parse(yamlString);
          setValues(initializeConfig(contract, merge(values, originalValues)));
        }
      };
      reader.readAsText(file);
    },
    [contract, originalValues]
  );

  useEffect(() => {
    if (originalValues) {
      setValues(cloneDeep(originalValues));
    }
  }, [setValues, originalValues]);

  return {
    values,
    setValues,
    valuesWithSecrets,
    showSecrets,
    toggleShowSecrets,
    isLoadingShowSecrets,
    originalValues: {
      value: originalValues,
      isLoading: isLoadingOriginalValues,
      isFetching: isFetchingOriginalValues,
      isSuccess: isSuccessOriginalValues,
    },
    contract: {
      value: contract,
      error: contractError,
      isLoading: isLoadingContract,
      isFetching: isFetchingContract,
    },
    reset,
    save,
    isLoadingSave,
    download,
    upload,
  };
}
