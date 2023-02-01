import React from "react";
import { Box, Drawer, MenuList } from "@mui/material";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationSelector from "components/organisms/OrganizationSelector/OrganizationSelector";

export const SIDE_BAR_WIDTH = 260;

function Sidebar() {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();

  return (
    <Drawer
      sx={{
        width: `${SIDE_BAR_WIDTH}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: colors.secondary.main,
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
      <Box>
        <OrganizationSelector />
      </Box>
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
      {currentUser && (
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
