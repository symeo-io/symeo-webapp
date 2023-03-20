import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useSelectedOrganization } from "hooks/useSelectedOrganization";

function Configurations() {
  const { formatMessage } = useIntl();
  const {
    selectedOrganization,
    lastSelectedOrganization,
    setSelectedOrganization,
    organizations,
  } = useSelectedOrganization();

  useEffect(() => {
    if (!selectedOrganization && organizations && organizations[0]) {
      setSelectedOrganization(lastSelectedOrganization ?? organizations[0]);
    }
  }, [
    lastSelectedOrganization,
    organizations,
    selectedOrganization,
    setSelectedOrganization,
  ]);

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
        <DataObjectIcon
          sx={{ marginRight: (theme) => theme.spacing(1), fontSize: "2rem" }}
        />
        <Typography variant="h1" sx={{ flex: 1 }}>
          {formatMessage({ id: "configurations.title" })}
        </Typography>
      </Box>
    </Box>
  );
}

export default Configurations;
