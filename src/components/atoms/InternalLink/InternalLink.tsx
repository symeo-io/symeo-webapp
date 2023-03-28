import React, { useMemo } from "react";
import { Link, LinkProps } from "react-router-dom";
import routes from "routing";
import { generatePath } from "react-router";
import { PropsWithSx } from "types/PropsWithSx";
import { styled } from "@mui/material";

export type InternalLinkProps = PropsWithSx &
  Omit<LinkProps, "to"> & {
    to: keyof typeof routes;
    params?: any;
  };

const LinkWithSx = styled(Link)({});

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
    <LinkWithSx to={path} {...rest}>
      {children}
    </LinkWithSx>
  );
}

export default InternalLink;
