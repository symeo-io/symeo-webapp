import React from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import routes from "routing";
import { useMatch } from "react-router-dom";
import { PropsWithSx } from "types/PropsWithSx";
import { useNavigate } from "hooks/useNavigate";

export type SidebarNavLinkProps = PropsWithSx & {
  label: string;
  icon: React.ReactElement;
  to: keyof typeof routes;
};

function SidebarNavLink({ label, icon, to, sx }: SidebarNavLinkProps) {
  const navigate = useNavigate();
  const route = routes[to];
  const selected = !!useMatch(route.path);

  return (
    <MenuItem sx={{ ...sx }} onClick={() => navigate(to)} selected={selected}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}

export default SidebarNavLink;
