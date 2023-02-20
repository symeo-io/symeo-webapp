import React from "react";
import routes from "routing";
import { Link, useMatch } from "react-router-dom";
import { PropsWithSx } from "types/PropsWithSx";
import { generateRoutePath } from "services/routing/path.generator";
import SidebarLinkBase from "components/molecules/SidebarLinkBase/SidebarLinkBase";

export type SidebarNavLinkProps = PropsWithSx & {
  label: string;
  icon: React.ReactElement;
  to: keyof typeof routes;
  params?: any;
};

function SidebarNavLink({ label, icon, to, params, sx }: SidebarNavLinkProps) {
  const route = routes[to];
  const selected = !!useMatch(route.path);
  const path = generateRoutePath(to, { params });

  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <SidebarLinkBase label={label} icon={icon} selected={selected} sx={sx} />
    </Link>
  );
}

export default SidebarNavLink;
