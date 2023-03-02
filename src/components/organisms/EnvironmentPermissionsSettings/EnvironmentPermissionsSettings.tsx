import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import Button from "components/atoms/Button/Button";
import {
  useGetEnvironmentPermissionsQuery,
  useUpdateEnvironmentPermissionsMutation,
} from "redux/api/environment-permissions/environment-permissions.api";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import EnvironmentUserPermission from "components/molecules/EnvironmentUserPermission/EnvironmentUserPermission";
import { colors } from "theme/colors";
import {
  EnvironmentPermissionRole,
  EnvironmentPermissionWithUser,
} from "redux/api/environment-permissions/environment-permissions.types";
import { cloneDeep } from "lodash";

export type EnvironmentPermissionsSettingsProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
};

function EnvironmentPermissionsSettings({
  repositoryVcsId,
  configurationId,
  environment,
  sx,
}: EnvironmentPermissionsSettingsProps) {
  const { formatMessage } = useIntl();
  const { data: permissionsData, isLoading: isLoadingPermissions } =
    useGetEnvironmentPermissionsQuery({
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
    });

  const permissions = useMemo(
    () => permissionsData?.permissions ?? [],
    [permissionsData]
  );

  const [editablePermissions, setEditablePermissions] = useState<
    EnvironmentPermissionWithUser[]
  >([]);

  useEffect(() => {
    setEditablePermissions(cloneDeep(permissions));
  }, [permissions]);

  const handleEnvironmentPermissionRoleChange = useCallback(
    (index: number) => (role: EnvironmentPermissionRole) => {
      const newPermissions = cloneDeep(editablePermissions);
      newPermissions[index].environmentPermissionRole = role;

      setEditablePermissions(newPermissions);
    },
    [editablePermissions]
  );

  const [updateEnvironmentPermissions, { isLoading: isLoadingUpdate }] =
    useUpdateEnvironmentPermissionsMutation();

  const handleUpdateEnvironmentPermissions = useCallback(async () => {
    await updateEnvironmentPermissions({
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
      permissions: editablePermissions
        .filter(
          ({ environmentPermissionRole }, index) =>
            permissions[index].environmentPermissionRole !==
            environmentPermissionRole
        )
        .map(({ id, userVcsId, environmentPermissionRole }) => ({
          id,
          userVcsId,
          environmentPermissionRole,
        })),
    });
  }, [
    configurationId,
    editablePermissions,
    environment.id,
    permissions,
    repositoryVcsId,
    updateEnvironmentPermissions,
  ]);

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3">
        {formatMessage(
          {
            id: "environment-settings.permissions.title",
          },
          { environmentName: environment.name }
        )}
      </Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(3),
          border: `1px solid ${colors.secondary.borders}`,
          borderRadius: "4px",
        }}
      >
        {isLoadingPermissions && (
          <LoadingBox size={24} sx={{ padding: (theme) => theme.spacing(1) }} />
        )}
        {!isLoadingPermissions &&
          editablePermissions.map((permission, index) => (
            <EnvironmentUserPermission
              permission={permission}
              onRoleChange={handleEnvironmentPermissionRoleChange(index)}
              sx={{
                borderBottom:
                  index !== permissions.length - 1
                    ? `1px solid ${colors.secondary.borders}`
                    : 0,
              }}
            />
          ))}
      </Box>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          loading={isLoadingUpdate}
          onClick={handleUpdateEnvironmentPermissions}
        >
          {formatMessage({
            id: "environment-settings.permissions.save-button-label",
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default EnvironmentPermissionsSettings;
