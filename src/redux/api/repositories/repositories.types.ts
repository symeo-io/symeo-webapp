import { Organization } from "redux/api/organizations/organizations.types";

export type Repository = {
  name: string;
  owner: Organization;
  pushedAt: string;
  vcsType: string;
  vcsUrl: string;
  configurationId?: string;
};
