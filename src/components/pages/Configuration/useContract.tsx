import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { useMemo } from "react";
import { Configuration } from "redux/api/configurations/configurations.types";

export type UseContractInput = {
  configuration: Configuration;
  branch?: string;
};

export function useContract({ configuration, branch }: UseContractInput) {
  const {
    data: configurationContractData,
    error,
    isLoading,
    isFetching,
  } = useGetConfigurationContractQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    branch,
  });

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  return useMemo(
    () => ({
      contract,
      error,
      isLoading,
      isFetching,
    }),
    [contract, error, isFetching, isLoading]
  );
}
