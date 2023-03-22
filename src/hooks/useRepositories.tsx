import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import { useMemo } from "react";

export function useRepositories() {
  const { selectedOrganization } = useSelectedOrganization();
  const { data: repositoriesData, isLoading } = useGetRepositoriesQuery();

  const repositories = useMemo(
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
        }) ?? [],
    [repositoriesData?.repositories, selectedOrganization?.vcsId]
  );

  return { repositories, isLoading };
}
