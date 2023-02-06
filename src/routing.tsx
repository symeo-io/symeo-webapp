import React from "react";
import ProjectsPage from "components/pages/Projects/Projects";
import ConfigurationPage from "components/pages/Configuration/Configuration";

export type Route = {
  isSecured?: boolean;
  sidebar?: boolean;
  path: string;
  element: React.ComponentType<object>;
  defaultParams?: Record<string, string>;
  contained?: boolean;
};

const routes = {
  home: {
    path: "/",
    isSecured: true,
    sidebar: true,
    element: ProjectsPage,
  } as Route,
  projects: {
    path: "/:organizationName",
    isSecured: true,
    sidebar: true,
    element: ProjectsPage,
  } as Route,
  configuration: {
    path: "/:organizationName/:repositoryVcsId/:configurationId",
    isSecured: true,
    sidebar: true,
    element: ConfigurationPage,
    contained: true,
  } as Route,
  "*": {
    path: "/*",
    element: () => <div>Not Found</div>, // TODO: build 404 page
  } as Route,
};

export default routes;
