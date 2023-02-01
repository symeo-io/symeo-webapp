import React from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import routes from "routing";
import { useMatch } from "react-router-dom";
import { PropsWithSx } from "types/PropsWithSx";
import { useNavigate } from "hooks/useNavigate";
import { colors } from "theme/colors";

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
    <MenuItem
      sx={{
        borderRadius: "4px",
        paddingX: (theme) => theme.spacing(2),
        paddingY: (theme) => theme.spacing(1.5),
        "& .MuiListItemIcon-root": {
          color: colors.secondary.shape,
        },

        "& .MuiListItemText-root .MuiTypography-root": {
          color: colors.secondary.borders,
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 700,
        },
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
          "& .MuiListItemIcon-root": {
            color: colors.secondary.shape,
          },
          "& .MuiListItemText-root .MuiTypography-root": {
            color: colors.secondary.borders,
          },
        },
        "&.Mui-selected": {
          backgroundColor: "rgba(255,255,255,0.2)",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },

          "& .MuiListItemIcon-root": {
            color: "white",
          },

          "& .MuiListItemText-root .MuiTypography-root": {
            fontWeight: 600,
            color: "white",
          },
        },
        ...sx,
      }}
      onClick={() => navigate(to)}
      selected={selected}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}

export default SidebarNavLink;
