import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "routing";
import AuthenticatedRoute from "components/atoms/AuthenticatedRoute/AuthenticatedRoute";
import { withSidebar } from "hoc/withSidebar";

function RoutesWrapper() {
  const routeComponents = useMemo(
    () =>
      Object.values(routes).map((route) => {
        let Component = route.element;

        if (route.sidebar) {
          Component = withSidebar(Component);
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.isSecured ? (
                <AuthenticatedRoute component={Component} />
              ) : (
                <Component />
              )
            }
          />
        );
      }),
    []
  );

  return <Routes>{routeComponents}</Routes>;
}

export default RoutesWrapper;
