import { VcsType } from "redux/api/configurations/configurations.types";

export type Organization = {
  vcsType: VcsType;
  vcsId: number;
  name: string;
  displayName: string;
  avatarUrl: string;
  settings?: {
    plan: "free" | "appSumo";
    licenceKey: string;
  };
};

export type GetOrganizationsResponse = {
  organizations: Organization[];
};

export type AddLicenceKeyToOrganizationsInput = {
  organizationId: number;
  licenceKey: string;
};
