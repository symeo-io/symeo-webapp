import React from "react";
import ReactDOM from "react-dom/client";
import { config } from "config";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import App from "./App";
import "./index.css";

if (config.datadog.clientToken) {
  if (config.env === "production") {
    datadogRum.init({
      applicationId: config.datadog.applicationId,
      clientToken: config.datadog.clientToken,
      site: config.datadog.site,
      service: "symeo-webapp",
      env: config.env,
      sampleRate: 100,
      trackInteractions: true,
    });
    datadogRum.startSessionReplayRecording();
  }

  datadogLogs.init({
    clientToken: config.datadog.clientToken,
    site: config.datadog.site,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
