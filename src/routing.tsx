import React from "react";
import ProjectsPage from "components/pages/Projects/Projects";
import ConfigurationsPage from "components/pages/Configurations/Configurations";
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
  configurations: {
    path: "/:organizationName",
    isSecured: true,
    sidebar: true,
    element: ConfigurationsPage,
  } as Route,
  projects: {
    path: "/projects/:organizationName",
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
