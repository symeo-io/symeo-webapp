import { Organization } from "redux/api/organizations/organizations.types";
import { Configuration } from "redux/api/configurations/configurations.types";

export type Repository = {
  vcsId: number;
  name: string;
  owner: Organization;
  pushedAt?: string;
  vcsType: "github";
  vcsUrl: string;
  configurations?: Configuration[];
};

export type Branch = {
  name: string;
  commitSha: string;
  vcsType: "github";
};

export type GetRepositoriesResponse = {
  repositories: Repository[];
};

export type GetRepositoryBranchesInput = {
  repositoryVcsId: number;
};

export type GetRepositoryBranchesResponse = {
  branches: Branch[];
};
