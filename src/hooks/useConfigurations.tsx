import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import { useCallback, useMemo } from "react";

export function useConfigurations() {
  const { selectedOrganization } = useSelectedOrganization();
  const { data: repositoriesData, isLoading } = useGetRepositoriesQuery();

  const configurations = useMemo(
    () =>
      repositoriesData?.repositories
        .filter(
          (repository) => repository.owner.vcsId === selectedOrganization?.vcsId
        )
        .sort((a, b) => {
          return (
            new Date(b.pushedAt ?? "").getTime() -
            new Date(a.pushedAt ?? "").getTime()
          );
        })
        .flatMap((repository) => repository.configurations ?? []) ?? [],
    [repositoriesData?.repositories, selectedOrganization?.vcsId]
  );

  const isRepositoryAdmin = useCallback(
    (repositoryVcsId: number) => {
      const repository = repositoriesData?.repositories.find(
        (repository) => repository.vcsId === repositoryVcsId
      );

      return repository?.isCurrentUserAdmin ?? false;
    },
    [repositoriesData?.repositories]
  );

  return { configurations, isLoading, isRepositoryAdmin };
}
