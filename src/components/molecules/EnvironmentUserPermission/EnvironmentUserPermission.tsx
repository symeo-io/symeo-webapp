import { PropsWithSx } from "types/PropsWithSx";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import {
  EnvironmentPermissionRole,
  EnvironmentPermissionRoles,
  EnvironmentPermissionWithUser,
} from "redux/api/environment-permissions/environment-permissions.types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";

export type EnvironmentUserPermissionProps = PropsWithSx & {
  permission: EnvironmentPermissionWithUser;
  onRoleChange: (role: EnvironmentPermissionRole) => void;
};

function EnvironmentUserPermission({
  sx,
  permission,
  onRoleChange,
}: EnvironmentUserPermissionProps) {
  const { formatMessage } = useIntl();

  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(2),
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <img
        src={permission.user.avatarUrl}
        alt={permission.user.name}
        style={{
          height: "48px",
          width: "48px",
          borderRadius: "50%",
          boxShadow: "rgba(27, 31, 36, 0.15) 0px 0px 0px 1px",
        }}
      />
      <Box sx={{ marginX: (theme) => theme.spacing(2), flex: 1 }}>
        <Typography variant="body2">{permission.user.name}</Typography>
        <Typography sx={{ color: colors.secondary.text, fontStyle: "italic" }}>
          {formatMessage({
            id: `environment-settings.permissions.role-messages.${permission.environmentPermissionRole}`,
          })}
        </Typography>
      </Box>
      <Select
        IconComponent={KeyboardArrowDownIcon}
        value={permission.environmentPermissionRole}
        onChange={(event) =>
          onRoleChange(event.target.value as EnvironmentPermissionRole)
        }
        sx={{
          "& .MuiSelect-select": { paddingY: (theme) => theme.spacing(1) },
        }}
      >
        {EnvironmentPermissionRoles.map((role) => (
          <MenuItem key={role} value={role}>
            {formatMessage({
              id: `environment-settings.permissions.roles.${role}`,
            })}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default EnvironmentUserPermission;
