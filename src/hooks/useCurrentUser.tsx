import { useAuth0, User, User as Auth0User } from "@auth0/auth0-react";
import { useEffect, useMemo } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { VcsType } from "redux/api/configurations/configurations.types";

export type UseCurrentUserOutput = {
  currentUser?: Auth0User;
  vcsType?: VcsType;
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
      vcsType: getVcsTypeFromUser(auth0User),
    }),
    [auth0User]
  );
}

function getVcsTypeFromUser(user: User | undefined): VcsType | undefined {
  return user?.sub?.replace("oauth2|", "").split("|")[0] as VcsType;
}
