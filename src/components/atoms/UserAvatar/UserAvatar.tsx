import React from "react";
import { User } from "@auth0/auth0-react";
import { PropsWithSx } from "types/PropsWithSx";
import Avatar from "components/atoms/Avatar/Avatar";

export type UserAvatarProps = PropsWithSx & {
  user: User;
};

function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar
      name={user.name}
      sx={{ width: "26px", height: "26px" }}
      src={user.picture}
    />
  );
}

export default UserAvatar;
