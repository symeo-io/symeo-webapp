import { useMemo } from "react";
import {
  Configuration,
  ConfigurationContract,
} from "redux/api/configurations/configurations.types";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { initializeConfig } from "services/contract/contract.utils";
import { Environment } from "redux/api/environments/environments.types";

export type UseValuesInput = {
  configuration: Configuration;
  environment: Environment;
  contract?: ConfigurationContract;
  branch?: string;
  versionId?: string;
};

export function useValues({
  configuration,
  environment,
  contract,
  branch,
  versionId,
}: UseValuesInput) {
  const {
    data: valuesData,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    environmentId: environment.id,
    branch,
    versionId,
  });

  const values = useMemo(
    () =>
      valuesData?.values &&
      contract &&
      initializeConfig(contract, valuesData.values),
    [contract, valuesData]
  );

  return useMemo(
    () => ({
      values,
      isLoading,
      isFetching,
      isSuccess,
      refetch,
    }),
    [values, isLoading, isFetching, isSuccess, refetch]
  );
}
