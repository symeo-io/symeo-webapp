import React from "react";
import {
  generatePath,
  useNavigate as useReactRouteNavigate,
} from "react-router";
import routes from "routing";

export const useNavigate = () => {
  const navigate = useReactRouteNavigate();

  return React.useCallback(
    (name: keyof typeof routes, { params }: { params?: any } = {}) => {
      const route = routes[name];
      const path = generatePath(route.path, {
        ...route.defaultParams,
        ...params,
      });

      if (window.location.pathname !== path) {
        navigate(path);
      }
    },
    [navigate]
  );
};
