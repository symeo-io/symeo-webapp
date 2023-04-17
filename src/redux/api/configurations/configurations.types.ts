import { Environment } from "redux/api/environments/environments.types";
import { EnvironmentPermission } from "redux/api/environment-permissions/environment-permissions.types";

export type VcsType = "github" | "gitlab";

export type Configuration = {
  id: string;
  name: string;
  vcsType: VcsType;
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

export type CreateConfigurationResponse = {
  configuration: Configuration;
};

export type CreateConfigurationInput = {
  name: string;
  repositoryVcsId: number;
  contractFilePath: string;
  branch: string;
};

export type UpdateConfigurationResponse = {
  configuration: Configuration;
};

export type UpdateConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
  name: string;
  contractFilePath: string;
  branch: string;
};

export type DeleteConfigurationInput = {
  repositoryVcsId: number;
  configurationId: string;
};

export type ValidateConfigurationResponse = {
  isValid: boolean;
};

export type ValidateConfigurationInput = {
  repositoryVcsId: number;
  contractFilePath: string;
  branch: string;
};
