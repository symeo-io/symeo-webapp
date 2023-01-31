import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { WithAuthenticationRequiredOptions } from "@auth0/auth0-react/dist/with-authentication-required";
import { withCurrentUserLoader } from "hoc/withCurrentUserLoader";

function AuthenticatedRoute({
  component,
  ...args
}: {
  component: React.ComponentType<object>;
} & WithAuthenticationRequiredOptions) {
  const Component = withAuthenticationRequired(
    withCurrentUserLoader(component),
    args
  );
  return <Component />;
}

export default React.memo(AuthenticatedRoute);
