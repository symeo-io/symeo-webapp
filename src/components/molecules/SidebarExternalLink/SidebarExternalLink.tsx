import React from "react";
import { PropsWithSx } from "types/PropsWithSx";
import SidebarLinkBase from "components/molecules/SidebarLinkBase/SidebarLinkBase";
import { Link, LinkProps } from "@mui/material";
import { colors } from "theme/colors";

export type SidebarExternalLinkProps = PropsWithSx & {
  label: string;
  icon: React.ReactElement;
  href: string;
  target?: LinkProps["target"];
};

function SidebarExternalLink({
  label,
  icon,
  href,
  target,
  sx,
}: SidebarExternalLinkProps) {
  return (
    <Link href={href} target={target} sx={{ textDecoration: "none" }}>
      <SidebarLinkBase
        label={label}
        icon={icon}
        sx={{
          "& .MuiListItemText-root .MuiTypography-root": {
            color: colors.secondary.borders,
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 400,
          },
          ...sx,
        }}
      />
    </Link>
  );
}

export default SidebarExternalLink;
