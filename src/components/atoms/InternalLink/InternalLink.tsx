import React, { useMemo } from "react";
import { Link, LinkProps } from "react-router-dom";
import routes from "routing";
import { generatePath } from "react-router";

export type InternalLinkProps = Omit<LinkProps, "to"> & {
  to: keyof typeof routes;
  params?: any;
};

function InternalLink({ children, to, params, ...rest }: InternalLinkProps) {
  const route = routes[to];
  const path = useMemo(
    () =>
      generatePath(route.path, {
        ...route.defaultParams,
        ...params,
      }),
    [params, route.defaultParams, route.path]
  );

  return (
    <Link to={path} {...rest}>
      {children}
    </Link>
  );
}

export default InternalLink;
