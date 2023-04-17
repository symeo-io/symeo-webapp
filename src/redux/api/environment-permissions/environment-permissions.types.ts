export const EnvironmentPermissionRoles = [
  "readNonSecret",
  "readSecret",
  "write",
  "admin",
] as const;

export type EnvironmentPermissionRole =
  (typeof EnvironmentPermissionRoles)[number];

export function meetRoleRequirement(
  requiredRole: EnvironmentPermissionRole,
  actualRole?: EnvironmentPermissionRole
) {
  if (!actualRole) {
    return false;
  }

  return (
    EnvironmentPermissionRoles.indexOf(actualRole) >=
    EnvironmentPermissionRoles.indexOf(requiredRole)
  );
}

export type VcsRepositoryRole =
  | "admin"
  | "maintain"
  | "write"
  | "triage"
  | "read";

export type VcsUser = {
  vcsId: number;
  name: string;
  avatarUrl: string;
  roleName: VcsRepositoryRole;
};

export type EnvironmentPermission = {
  id: string;
  userVcsId: number;
  environmentId: string;
  environmentPermissionRole: EnvironmentPermissionRole;
};

export type EnvironmentPermissionWithUser = EnvironmentPermission & {
  user: VcsUser;
};

export type GetEnvironmentPermissionsInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type GetEnvironmentPermissionsResponse = {
  permissions: EnvironmentPermissionWithUser[];
};

export type UpdateEnvironmentPermissionsInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  permissions: Omit<EnvironmentPermission, "environmentId">[];
};

export type UpdateEnvironmentPermissionsResponse = {
  permissions: EnvironmentPermission[];
};
