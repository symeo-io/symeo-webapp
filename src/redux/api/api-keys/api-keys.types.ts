export type ApiKey = {
  id: string;
  environmentId: string;
  key: string;
  createdAt: string;
};

export type GetApiKeysResponse = {
  apiKeys: ApiKey[];
};

export type GetApiKeysInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type CreateApiKeysResponse = {
  apiKey: ApiKey;
};

export type CreateApiKeysInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type DeleteApiKeysInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  apiKeyId: string;
};
