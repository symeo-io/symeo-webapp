import React from "react";
import { Box, Drawer, MenuList } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import { useIntl } from "react-intl";

export const SIDE_BAR_WIDTH = 224;

function Sidebar() {
  const { formatMessage } = useIntl();
  const { user } = useAuth0();

  return (
    <Drawer
      sx={{
        width: `${SIDE_BAR_WIDTH}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${SIDE_BAR_WIDTH}px`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          border: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          flex: 1,
          padding: (theme) => theme.spacing(1.5),
        }}
      >
        <MenuList>
          <SidebarNavLink
            label={formatMessage({ id: "sidebar.home-link-label" })}
            icon={<BarChartIcon />}
            to="home"
          />
        </MenuList>
      </Box>
      {user && (
        <Box
          sx={{
            padding: (theme) => theme.spacing(1.5),
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CurrentUser />
        </Box>
      )}
    </Drawer>
  );
}

export default Sidebar;
