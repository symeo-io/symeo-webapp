import React from "react";
import {
  Box,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useIntl } from "react-intl";
import LogoutIcon from "@mui/icons-material/Logout";
import { PropsWithSx } from "types/PropsWithSx";
import { SIDE_BAR_WIDTH } from "theme/theme";

export type CurrentUserProps = PropsWithSx;

function CurrentUser({ sx }: CurrentUserProps) {
  const { user, logout } = useAuth0();
  const { formatMessage } = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout({ returnTo: window.location.origin });
    closeMenu();
  };

  if (!user) return null;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: (theme) => theme.spacing(1),
          borderRadius: "4px",
          cursor: "pointer",
          "&:hover": {
            background: "rgba(220, 231, 242, 0.35)",
          },
          ...sx,
        }}
        onClick={openMenu}
      >
        <UserAvatar user={user} />
        <Box
          sx={{
            marginLeft: (theme) => theme.spacing(1),
            flex: 1,
            color: "white",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {user.name}
        </Box>
        <Box sx={{ marginLeft: (theme) => theme.spacing(1) }}>
          <KeyboardArrowUpIcon sx={{ color: "white" }} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        transformOrigin={{
          vertical: "bottom",
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
              {formatMessage({ id: "sidebar.account.your-account" })}
            </ListSubheader>
          }
        >
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              {formatMessage({ id: "sidebar.account.logout" })}
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default CurrentUser;
