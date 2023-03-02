import { Environment } from "redux/api/environments/environments.types";
import { EnvironmentPermission } from "redux/api/environment-permissions/environment-permissions.types";

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
  currentUserEnvironmentsPermissions: EnvironmentPermission[];
  isCurrentUserRepositoryAdmin: boolean;
};

export type GetConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
};

export type GetConfigurationContractResponse = {
  contract: ConfigurationContract;
};

export type GetConfigurationContractInput = {
  repositoryVcsId: number;
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

export type UpdateGitHubConfigurationResponse = {
  configuration: Configuration;
};

export type UpdateGitHubConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
  name: string;
  contractFilePath: string;
  branch: string;
};

export type DeleteGitHubConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
};

export type ValidateGitHubConfigurationResponse = {
  isValid: boolean;
};

export type ValidateGitHubConfigurationInput = {
  repositoryVcsId: number;
  contractFilePath: string;
  branch: string;
};
