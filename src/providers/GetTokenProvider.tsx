import React from "react";
import { Auth0Context } from "@auth0/auth0-react";

// TODO: find a cleaner way to do this. According to this gist, it is currently the only way: https://gist.github.com/adamjmcgrath/0ed6a04047aad16506ca24d85f1b2a5c
const deferred = (() => {
  const props: { promise?: Promise<any>; resolve?: (value: unknown) => void } =
    {};
  props.promise = new Promise((resolve) => (props.resolve = resolve));
  return props;
})();

export const getAccessToken = async () => {
  const getToken = await deferred.promise;
  return getToken();
};

export function GetTokenProvider({ children }: React.PropsWithChildren) {
  return (
    <Auth0Context.Consumer>
      {({ getAccessTokenSilently }: any) => {
        deferred.resolve && deferred.resolve(getAccessTokenSilently);
        return children;
      }}
    </Auth0Context.Consumer>
  );
}
