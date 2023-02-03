import React from "react";
import HomePage from "components/pages/Home/Home";
import { Box } from "@mui/material";

export type Route = {
  isSecured?: boolean;
  sidebar?: boolean;
  path: string;
  element: React.ComponentType<object>;
  defaultParams?: Record<string, string>;
};

const routes = {
  home: {
    path: "/",
    isSecured: true,
    sidebar: true,
    element: HomePage,
  } as Route,
  projects: {
    path: "/:organizationName",
    isSecured: true,
    sidebar: true,
    element: HomePage,
  } as Route,
  configuration: {
    path: "/:organizationName/:vcsRepositoryId/:configurationId",
    isSecured: true,
    sidebar: true,
    element: Box,
  } as Route,
  "*": {
    path: "/*",
    element: () => <div>Not Found</div>, // TODO: build 404 page
  } as Route,
};

export default routes;
