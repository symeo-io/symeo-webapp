export type ConfigurationValues = {
  [property: string]: string | number | boolean | ConfigurationValues;
};

export type GetEnvironmentValuesInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type GetEnvironmentValuesResponse = {
  values: ConfigurationValues;
};

export type SetEnvironmentValuesInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  values: ConfigurationValues;
};
