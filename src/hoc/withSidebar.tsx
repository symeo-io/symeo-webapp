import React from "react";
import { Box } from "@mui/material";
import Sidebar from "components/organisms/Sidebar/Sidebar";

export function withSidebar(
  WrappedComponent: React.ComponentType,
  contained: boolean = false
): React.FC {
  return function (props) {
    return (
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
          }}
        >
          <Box
            sx={{
              flex: 1,
              paddingX: (theme) => theme.spacing(3),
              maxWidth: "1441px",
              height: "100%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: "100%",
                paddingY: (theme) => theme.spacing(3),
                display: "flex",
                flexDirection: "column",
                overflow: contained ? "hidden" : "unset",
              }}
            >
              <WrappedComponent {...props} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
}
