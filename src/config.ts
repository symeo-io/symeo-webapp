export const config = {
  env: import.meta.env.MODE,
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN ?? "",
    audience: import.meta.env.VITE_AUTH0_AUDIENCE ?? "",
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? "",
  },
  api: {
    url: import.meta.env.VITE_API_URL ?? "",
  },
  githubApp: {
    name: import.meta.env.VITE_GITHUB_APP_NAME ?? "",
  },
  datadog: {
    applicationId: import.meta.env.VITE_DATADOG_APPLICATION_ID ?? "",
    clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN ?? "",
    site: import.meta.env.VITE_DATADOG_SITE ?? "datadoghq.eu",
  },
};
