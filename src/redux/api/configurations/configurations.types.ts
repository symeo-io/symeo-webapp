import { Environment } from "redux/api/environments/environments.types";

export type Configuration = {
  id: string;
  name: string;
  vcsType: "github";
  repository: { name: string; vcsId: number };
  owner: { name: string; vcsId: number };
  contractFilePath: string;
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

export type ConfigurationContract = {
  [property: string]: ConfigurationContract | ConfigurationProperty;
};

export type GetConfigurationResponse = {
  configuration: Configuration;
};

export type GetConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
};

export type GetConfigurationContractResponse = {
  contract: ConfigurationContract;
};

export type GetConfigurationContractInput = {
  repositoryVcsId: string;
  configurationId: string;
  branch?: string;
};

export type CreateGitHubConfigurationResponse = {
  configuration: Configuration;
};

export type CreateGitHubConfigurationInput = {
  name: string;
  repositoryVcsId: number;
  contractFilePath: string;
  branch: string;
};

export type ValidateGitHubConfigurationResponse = {
  isValid: boolean;
};

export type ValidateGitHubConfigurationInput = {
  repositoryVcsId: number;
  contractFilePath: string;
  branch: string;
};
