export type Organization = {
  vcsId: number;
  name: string;
  displayName: string;
  avatarUrl: string;
};

export type GetOrganizationsResponse = {
  organizations: Organization[];
};
