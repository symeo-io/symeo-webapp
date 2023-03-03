import { useMemo } from "react";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";

export function useValuesData(
  configuration?: Configuration,
  environment?: Environment,
  branch?: string
) {
  const {
    data: configurationContractData,
    error: contractError,
    isLoading: isLoadingContract,
    isFetching: isFetchingContract,
  } = useGetConfigurationContractQuery(
    {
      configurationId: configuration?.id as string,
      repositoryVcsId: configuration?.repository.vcsId as number,
      branch,
    },
    { skip: !configuration || !environment }
  );

  const {
    data: valuesData,
    isLoading: isLoadingValues,
    isFetching: isFetchingValues,
    isSuccess: isSuccessValues,
  } = useGetValuesForEnvironmentQuery(
    {
      configurationId: configuration?.id as string,
      repositoryVcsId: configuration?.repository.vcsId as number,
      environmentId: environment?.id as string,
    },
    { skip: !configuration || !environment }
  );

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  const values = useMemo(() => valuesData?.values, [valuesData?.values]);

  return {
    contract,
    values,
    contractError,
    isLoadingContract,
    isFetchingContract,
    isLoadingValues,
    isFetchingValues,
    isSuccessValues,
  };
}
