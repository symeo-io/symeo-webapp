import React from "react";
import { Box, Divider, Drawer, MenuList } from "@mui/material";
import SidebarNavLink from "components/molecules/SidebarNavLink/SidebarNavLink";
import SourceIcon from "@mui/icons-material/Source";
import CurrentUser from "components/molecules/CurrentUser/CurrentUser";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import { useCurrentUser } from "hooks/useCurrentUser";
import OrganizationSelector from "components/organisms/OrganizationSelector/OrganizationSelector";
import { SIDE_BAR_WIDTH } from "theme/theme";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import SidebarExternalLink from "components/molecules/SidebarExternalLink/SidebarExternalLink";
import DescriptionIcon from "@mui/icons-material/Description";

function Sidebar() {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { selectedOrganization } = useSelectedOrganization();

  return (
    <Drawer
      sx={{
        width: `${SIDE_BAR_WIDTH}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: colors.secondary.textActive,
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
      <Divider
        sx={{
          marginX: (theme) => theme.spacing(1),
          borderColor: colors.secondary.text,
        }}
      />
      <Box
        sx={{
          flex: 1,
          padding: (theme) => theme.spacing(1.5),
        }}
      >
        {selectedOrganization && (
          <MenuList>
            <SidebarNavLink
              label={formatMessage({ id: "sidebar.projects-link-label" })}
              icon={<SourceIcon />}
              to="projects"
              params={{ organizationName: selectedOrganization.name }}
            />
          </MenuList>
        )}
      </Box>
      <Box sx={{ padding: (theme) => theme.spacing(1.5) }}>
        <MenuList>
          <SidebarExternalLink
            label={formatMessage({ id: "sidebar.documentation-link-label" })}
            icon={<DescriptionIcon />}
            href="https://docs.symeo.io"
            target="_blank"
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
