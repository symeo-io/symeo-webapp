import React from "react";
import RoutesWrapper from "./RoutesWrapper";
import { RawIntlProvider } from "react-intl";
import { intl } from "intl";
import { Provider, ReactReduxContext } from "react-redux";
import { store } from "store";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "config";
import { GetTokenProvider } from "providers/GetTokenProvider";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme/theme";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import ConfirmDialogProvider from "providers/confirm/ConfirmDialogProvider";
import { LocalStorageContextProvider } from "providers/localStorage/LocalStorageContextProvider";

function App() {
  return (
    <RawIntlProvider value={intl}>
      <Provider store={store} context={ReactReduxContext}>
        <Auth0Provider
          domain={config.auth0.domain}
          clientId={config.auth0.clientId}
          audience={config.auth0.audience}
          redirectUri={window.location.origin}
          cacheLocation="localstorage"
        >
          <GetTokenProvider>
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                  <ConfirmDialogProvider>
                    <LocalStorageContextProvider>
                      <RoutesWrapper />
                    </LocalStorageContextProvider>
                  </ConfirmDialogProvider>
                </BrowserRouter>
              </SnackbarProvider>
            </ThemeProvider>
          </GetTokenProvider>
        </Auth0Provider>
      </Provider>
    </RawIntlProvider>
  );
}

export default App;
