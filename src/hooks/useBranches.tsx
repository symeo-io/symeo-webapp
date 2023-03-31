import { useGetRepositoryBranchesQuery } from "redux/api/repositories/repositories.api";
import { useMemo } from "react";

export function useBranches(repositoryVcsId: number | undefined) {
  const { data: branchesData, isLoading } = useGetRepositoryBranchesQuery(
    {
      repositoryVcsId: repositoryVcsId as number,
    },
    { skip: !repositoryVcsId }
  );

  const branches = useMemo(
    () => branchesData?.branches ?? [],
    [branchesData?.branches]
  );

  return { branches, isLoading };
}
