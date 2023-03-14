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
};

export function useValues({
  configuration,
  environment,
  contract,
}: UseValuesInput) {
  const {
    data: valuesData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    environmentId: environment.id,
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
    }),
    [values, isFetching, isLoading, isSuccess]
  );
}
