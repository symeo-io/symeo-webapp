import { environmentsColorPalettes } from "theme/colors";

export type EnvironmentColor = keyof typeof environmentsColorPalettes;

export type Environment = {
  id: string;
  name: string;
  color: EnvironmentColor;
  createdAt: string;
};

export type CreateEnvironmentInput = {
  repositoryVcsId: number;
  configurationId: string;
  name: string;
  color: EnvironmentColor;
};

export type CreateEnvironmentResponse = {
  environment: Environment;
};

export type DeleteEnvironmentInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type UpdateEnvironmentInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  name: string;
  color: EnvironmentColor;
};

export type UpdateEnvironmentResponse = {
  environment: Environment;
};
