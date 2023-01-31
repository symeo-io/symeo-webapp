import React from "react";
import { Avatar } from "@mui/material";
import { colors } from "theme/colors";
import { User } from "@auth0/auth0-react";

export type UserAvatarProps = {
  user: User;
};

function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar
      alt={user.name}
      sx={{ background: colors.primary.main, width: "26px", height: "26px" }}
      src={user.picture}
    >
      {user.name && user.name[0]}
    </Avatar>
  );
}

export default UserAvatar;
