import React, { useCallback } from "react";
import {
  Box,
  Divider,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useIntl } from "react-intl";
import { Organization } from "redux/api/organizations/organizations.types";
import Status from "components/atoms/Status/Status";
import { colors } from "theme/colors";
import { config } from "config";
import { SIDE_BAR_WIDTH } from "theme/theme";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import Avatar from "components/atoms/Avatar/Avatar";

const GITHUB_PERMISSIONS_LINK = `https://github.com/settings/connections/applications/${config.github.appClientId}`;

function OrganizationSelector() {
  const { formatMessage } = useIntl();
  const { currentUser, vcsType } = useCurrentUser();
  const { selectedOrganization, organizations, setSelectedOrganization } =
    useSelectedOrganization();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectOrganization = useCallback(
    (organization: Organization) => {
      setSelectedOrganization(organization);
      closeMenu();
    },
    [setSelectedOrganization]
  );

  return (
    <>
      <Box
        onClick={openMenu}
        sx={{
          padding: (theme) => theme.spacing(2),
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <Avatar
          name={selectedOrganization?.name}
          sx={{
            borderRadius: "6px",
            width: "40px",
            height: "40px",
          }}
          src={selectedOrganization?.avatarUrl}
        />
        <Box
          sx={{
            paddingX: (theme) => theme.spacing(2),
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              lineHeight: "28px",
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedOrganization?.displayName}
          </Box>
          <Box
            sx={{
              lineHeight: "20px",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {currentUser?.name}
          </Box>
        </Box>
        <Box>
          <KeyboardArrowDownIcon sx={{ color: "white" }} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: `${SIDE_BAR_WIDTH - 32}px`,
          },
        }}
      >
        <MenuList
          subheader={
            <ListSubheader>
              {formatMessage({
                id: "sidebar.organization-selector.organizations",
              })}
            </ListSubheader>
          }
        >
          {organizations &&
            organizations.map((organization) => (
              <MenuItem
                onClick={() => selectOrganization(organization)}
                key={organization.vcsId}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "unset !important",
                    marginRight: (theme) => theme.spacing(1),
                  }}
                >
                  <Avatar
                    name={organization.name}
                    sx={{
                      borderRadius: "3px",
                      width: "24px",
                      height: "24px",
                      fontSize: "14px",
                    }}
                    src={organization.avatarUrl}
                  />
                </ListItemIcon>
                <Typography
                  variant="inherit"
                  sx={{
                    lineHeight: "24px",
                    fontSize: "16px",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {organization.name}
                </Typography>
                {organization.vcsId === selectedOrganization?.vcsId && (
                  <Status
                    variant="success"
                    label={formatMessage({
                      id: "sidebar.organization-selector.current",
                    })}
                  />
                )}
              </MenuItem>
            ))}
          {vcsType === "github" && (
            <>
              <Divider />
              <MenuItem
                onClick={() => window.open(GITHUB_PERMISSIONS_LINK, "_blank")}
              >
                <Box>
                  <Typography
                    variant="inherit"
                    sx={{ lineHeight: "24px", fontSize: "16px", flex: 1 }}
                  >
                    {formatMessage({
                      id: "sidebar.organization-selector.cant-find",
                    })}
                  </Typography>
                  <Typography
                    variant="inherit"
                    sx={{
                      lineHeight: "24px",
                      fontSize: "16px",
                      flex: 1,
                      color: colors.primary.main,
                    }}
                  >
                    {formatMessage({
                      id: "sidebar.organization-selector.check-permissions",
                    })}
                  </Typography>
                </Box>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
}

export default OrganizationSelector;
