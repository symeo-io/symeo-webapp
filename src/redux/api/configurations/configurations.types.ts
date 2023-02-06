export type Environment = {
  id: string;
  name: string;
  color: string;
};

export type Configuration = {
  id: string;
  name: string;
  vcsType: "github";
  repository: { name: string; vcsId: number };
  owner: { name: string; vcsId: number };
  configFormatFilePath: string;
  branch: string;
  environments: Environment[];
};

export type ConfigurationPropertyType =
  | "string"
  | "integer"
  | "float"
  | "boolean";

export type ConfigurationProperty = {
  type: ConfigurationPropertyType;
  secret?: boolean;
  optional?: boolean;
};

export type ConfigurationFormat = {
  [property: string]: ConfigurationFormat | ConfigurationProperty;
};

export type GetConfigurationResponse = {
  configuration: Configuration;
};

export type GetConfigurationInput = {
  repositoryVcsId: string;
  configurationId: string;
};

export type GetConfigurationFormatResponse = {
  format: ConfigurationFormat;
};

export type GetConfigurationFormatInput = {
  repositoryVcsId: string;
  configurationId: string;
};

export type CreateGitHubConfigurationResponse = {
  configuration: Configuration;
};

export type CreateGitHubConfigurationInput = {
  name: string;
  repositoryVcsId: number;
  configFormatFilePath: string;
  branch: string;
};

export type ValidateGitHubConfigurationResponse = {
  isValid: boolean;
};

export type ValidateGitHubConfigurationInput = {
  repositoryVcsId: number;
  configFormatFilePath: string;
  branch: string;
};
