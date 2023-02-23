import React from "react";
import { Box } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import { Configuration } from "redux/api/configurations/configurations.types";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { colors } from "theme/colors";
import InternalLink from "components/atoms/InternalLink/InternalLink";

export type ConfigurationLinkProps = PropsWithSx & {
  configuration: Configuration;
};

function ConfigurationLink({ configuration, sx }: ConfigurationLinkProps) {
  return (
    <InternalLink
      to="configuration"
      params={{
        organizationName: configuration.owner.name,
        repositoryVcsId: configuration.repository.vcsId,
        configurationId: configuration.id,
      }}
      style={{ textDecoration: "none", color: colors.primary.textActive }}
    >
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
          transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

          "&:hover": {
            backgroundColor: colors.primary.surfaceHover,
          },

          ...sx,
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
    </InternalLink>
  );
}

export default ConfigurationLink;
