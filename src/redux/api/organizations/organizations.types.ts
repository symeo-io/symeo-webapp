export type Organization = {
  vcsId: number;
  name: string;
  avatarUrl: string;
};

export type GetOrganizationsResponse = {
  organizations: Organization[];
};
