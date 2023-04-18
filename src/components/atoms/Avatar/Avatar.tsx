import { PropsWithSx } from "types/PropsWithSx";
import { Avatar as MuiAvatar } from "@mui/material";
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import React, { useMemo } from "react";

const avatarColorPalettes = [
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
];

function getAvatarColorPalette(name?: string) {
  if (!name) {
    return blue;
  }

  let sumOfCharacterCodes = 0;

  for (let i = 0; i < name.length; i++) {
    sumOfCharacterCodes += name.charCodeAt(i);
  }

  const paletteIndex = sumOfCharacterCodes % avatarColorPalettes.length;

  return avatarColorPalettes[paletteIndex];
}

export type AvatarProps = PropsWithSx & {
  name?: string;
  src?: string;
};

function Avatar({ name, src, sx }: AvatarProps) {
  const palette = useMemo(() => getAvatarColorPalette(name), [name]);

  return (
    <MuiAvatar
      alt={name}
      sx={{
        color: palette && palette[900],
        backgroundColor: src ? "white" : palette && palette[100],
        ...sx,
      }}
      src={src}
    >
      {name && name[0]?.toUpperCase()}
    </MuiAvatar>
  );
}

export default Avatar;
