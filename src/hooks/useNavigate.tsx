import React from "react";
import { useNavigate as useReactRouteNavigate } from "react-router";
import routes from "routing";
import { generateRoutePath } from "services/routing/path.generator";

export const useNavigate = () => {
  const navigate = useReactRouteNavigate();

  return React.useCallback(
    (name: keyof typeof routes, { params }: { params?: any } = {}) => {
      const path = generateRoutePath(name, { params });

      if (window.location.pathname !== path) {
        navigate(path);
      }
    },
    [navigate]
  );
};
