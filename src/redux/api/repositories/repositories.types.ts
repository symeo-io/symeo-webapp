import { Organization } from "redux/api/organizations/organizations.types";

export type Repository = {
  vcsId: number;
  name: string;
  owner: Organization;
  pushedAt?: string;
  vcsType: "github";
  vcsUrl: string;
};

export type GetRepositoriesResponse = {
  repositories: Repository[];
};

export type GetRepositoriesInput = {
  ownerName: string;
};
