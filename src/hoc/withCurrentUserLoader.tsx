import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useCurrentUser } from "hooks/useCurrentUser";

export function withCurrentUserLoader(
  WrappedComponent: React.ComponentType
): React.FC {
  return function (props) {
    const { currentUser } = useCurrentUser();

    if (!currentUser) {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
