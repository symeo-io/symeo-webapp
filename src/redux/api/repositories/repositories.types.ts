import { Organization } from "redux/api/organizations/organizations.types";

export type Repository = {
  vcsId: number;
  name: string;
  owner: Organization;
  pushedAt?: string;
  vcsType: "github";
  vcsUrl: string;
  configurationCount?: number;
};

export type GetRepositoriesResponse = {
  repositories: Repository[];
};
