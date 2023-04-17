import { Organization } from "redux/api/organizations/organizations.types";
import {
  Configuration,
  VcsType,
} from "redux/api/configurations/configurations.types";

export type Repository = {
  vcsId: number;
  name: string;
  owner: Organization;
  pushedAt?: string;
  vcsType: VcsType;
  vcsUrl: string;
  defaultBranch: string;
  configurations?: Configuration[];
  isCurrentUserAdmin: boolean;
};

export type Branch = {
  name: string;
  commitSha: string;
  vcsType: VcsType;
};

export type EnvFile = {
  path: string;
  content: string;
  contract: string;
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

export type GetRepositoryEnvFilesInput = {
  repositoryVcsId: number;
  branch: string;
};

export type GetRepositoryEnvFilesResponse = {
  files: EnvFile[];
};

export type CreateRepositoryCommitInput = {
  repositoryVcsId: number;
  branch: string;
  fileContent: string;
  filePath: string;
  commitMessage: string;
};
