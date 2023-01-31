import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/organisms/Sidebar/Sidebar";

export function withSidebar(WrappedComponent: React.ComponentType): React.FC {
  return function (props) {
    return (
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              padding: (theme) => theme.spacing(3),
              maxWidth: "1441px",
              margin: "auto",
            }}
          >
            <WrappedComponent {...props} />
          </Box>
        </Box>
      </Box>
    );
  };
}
