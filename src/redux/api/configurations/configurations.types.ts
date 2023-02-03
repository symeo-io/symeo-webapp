export type Configuration = {
  id: string;
  name: string;
  vcsType: "github";
  repository: { name: string; vcsId: number };
  owner: { name: string; vcsId: number };
  configFormatFilePath: string;
  branch: string;
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
