import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useIntl } from "react-intl";
import { colors } from "theme/colors";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";
import AddOrganizationLicenceKeyButton from "components/molecules/AddOrganizationLicenceKeyButton/AddOrganizationLicenceKeyButton";

function OrganizationSettings() {
  const { formatMessage } = useIntl();
  const { selectedOrganization } = useSelectedOrganization();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(4),
          display: "flex",
          alignItems: "center",
        }}
      >
        <SettingsIcon
          sx={{ marginRight: (theme) => theme.spacing(1), fontSize: "2rem" }}
        />
        <Typography variant="h1" sx={{ flex: 1 }}>
          {formatMessage({ id: "organization-settings.title" })}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2" sx={{ flex: 1 }}>
          {formatMessage({ id: "organization-settings.overview.title" })}
        </Typography>
        <Box
          sx={{
            borderRadius: "8px",
            marginTop: (theme) => theme.spacing(3),
            padding: (theme) => theme.spacing(3),
            border: `1px solid ${colors.secondary.borders}`,
            display: "flex",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
            {formatMessage({ id: "organization-settings.overview.id-label" })}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 400 }}>
            {selectedOrganization?.vcsType}|{selectedOrganization?.vcsId}
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "8px",
            marginTop: (theme) => theme.spacing(3),
            padding: (theme) => theme.spacing(3),
            border: `1px solid ${colors.secondary.borders}`,
            display: "flex",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
            {formatMessage({ id: "organization-settings.overview.name-label" })}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 400 }}>
            {selectedOrganization?.name}
          </Typography>
        </Box>
      </Box>
      {selectedOrganization && (
        <Box sx={{ marginTop: (theme) => theme.spacing(3) }}>
          <Typography variant="h2" sx={{ flex: 1 }}>
            {formatMessage({ id: "organization-settings.plan.title" })}
          </Typography>

          <Box
            sx={{
              borderRadius: "8px",
              marginTop: (theme) => theme.spacing(3),
              padding: (theme) => theme.spacing(3),
              border: `1px solid ${colors.secondary.borders}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
              {selectedOrganization.settings?.plan
                ? formatMessage({
                    id: `organization-settings.plan.license.${selectedOrganization.settings.plan}`,
                  })
                : formatMessage({
                    id: `organization-settings.plan.license.free`,
                  })}
            </Typography>
            {(!selectedOrganization.settings?.plan ||
              selectedOrganization.settings.plan === "free") && (
              <AddOrganizationLicenceKeyButton
                organization={selectedOrganization}
              />
            )}
            {selectedOrganization.settings?.plan &&
              selectedOrganization.settings.plan !== "free" && (
                <Typography variant="body2" sx={{ fontWeight: 400 }}>
                  {selectedOrganization.settings?.licenceKey}
                </Typography>
              )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default OrganizationSettings;
