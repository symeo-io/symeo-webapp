import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { colors } from "theme/colors";
import InternalLink from "components/atoms/InternalLink/InternalLink";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ConfigurationSettingsDialog from "components/organisms/ConfigurationSettingsDialog/ConfigurationSettingsDialog";

export type ConfigurationLinkProps = PropsWithSx & {
  configuration: Configuration;
};

function ConfigurationLink({ configuration, sx }: ConfigurationLinkProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <InternalLink
        to="configuration"
        params={{
          organizationName: configuration.owner.name,
          repositoryVcsId: configuration.repository.vcsId,
          configurationId: configuration.id,
        }}
        style={{
          textDecoration: "none",
          color: colors.primary.textActive,
        }}
      >
        <Box sx={{ ...sx, position: "relative" }}>
          <Box
            sx={{
              backgroundColor: colors.primary.surface,
              height: "28px",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: 500,
              border: `1px solid ${colors.primary.main}`,
              paddingX: (theme) => theme.spacing(1),
              paddingRight: "44px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

              "&:hover": {
                backgroundColor: colors.primary.surfaceHover,
              },
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                height: "18px",
                width: "18px",
                backgroundColor: colors.primary.borders,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: (theme) => theme.spacing(0.5),
              }}
            >
              <DataObjectIcon
                sx={{ fontSize: "14px", color: colors.primary.surface }}
              />
            </Box>
            <Box sx={{ color: colors.primary.textActive }}>
              {configuration.name}
            </Box>
          </Box>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpenDialog();
            }}
            sx={{
              height: "28px",
              width: "28px",
              borderRadius: "50%",
              backgroundColor: colors.secondary.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              border: `1px solid ${colors.secondary.main}`,
              top: 0,
              right: 0,
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

              "&:hover": {
                backgroundColor: colors.secondary.surfaceHover,
              },
            }}
          >
            <SettingsOutlinedIcon
              sx={{ color: colors.secondary.textActive, fontSize: "20px" }}
            />
          </Box>
        </Box>
      </InternalLink>
      <ConfigurationSettingsDialog
        configuration={configuration}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default ConfigurationLink;
