import { EnvironmentColor } from "redux/api/environments/environments.types";
import { EnvironmentPermissionRole } from "redux/api/environment-permissions/environment-permissions.types";

export type ConfigurationAuditEventType = "created" | "updated" | "deleted";
export type EnvironmentAuditEventType =
  | "created"
  | "updated"
  | "deleted"
  | "permissionUpdated"
  | "apiKeyCreated"
  | "apiKeyDeleted"
  | "valuesUpdated"
  | "secretsRead";

export type ConfigurationAuditMetadata = {
  metadata: {
    name: string;
    branch?: string;
    contractFilePath?: string;
  };
};

export type EnvironmentMetadataType = {
  name: string;
  color?: EnvironmentColor;
};

export type ApiKeyMetadataType = {
  hiddenKey: string;
};

export type PermissionMetadataType = {
  userName: string;
  previousRole: EnvironmentPermissionRole;
  newRole: EnvironmentPermissionRole;
};

type UpdatedPropertiesType = {
  environmentName: string;
  updatedProperties: string[];
};

type ReadPropertiesType = {
  environmentName: string;
  readProperties: string[];
};

export type ValuesMetadataType = UpdatedPropertiesType | ReadPropertiesType;

export type EnvironmentAuditMetadata = {
  metadata:
    | EnvironmentMetadataType
    | ApiKeyMetadataType
    | PermissionMetadataType
    | ValuesMetadataType;
};

export type ConfigurationAudit = {
  configurationId: string;
  eventType: ConfigurationAuditEventType;
  repositoryVcsId: number;
  userId: string;
  userName: string;
  metadata: ConfigurationAuditMetadata;
  createdAt: string;
};

export type EnvironmentAudit = {
  environmentId: string;
  eventType: EnvironmentAuditEventType;
  repositoryVcsId: number;
  userId: string;
  userName: string;
  metadata: EnvironmentAuditMetadata;
  createdAt: string;
};

export type GetConfigurationAuditsInput = {
  repositoryVcsId: number;
  configurationId: string;
};

export type GetConfigurationAuditsResponse = {
  configurationAudits: ConfigurationAudit[];
};

export type GetEnvironmentAuditsInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type GetEnvironmentAuditsResponse = {
  environmentAudits: EnvironmentAudit[];
};
