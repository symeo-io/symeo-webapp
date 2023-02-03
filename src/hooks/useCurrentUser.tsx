import { useAuth0, User as Auth0User } from "@auth0/auth0-react";
import { useEffect, useMemo } from "react";
import { datadogRum } from "@datadog/browser-rum";

export type UseCurrentUserOutput = {
  currentUser?: Auth0User;
};

export function useCurrentUser(): UseCurrentUserOutput {
  const { user: auth0User } = useAuth0();

  useEffect(() => {
    if (auth0User) {
      datadogRum.setUser({
        id: auth0User.sub,
        name: auth0User.name,
        email: auth0User.email,
      });
    }
  }, [auth0User]);

  return useMemo(
    () => ({
      currentUser: auth0User,
    }),
    [auth0User]
  );
}
