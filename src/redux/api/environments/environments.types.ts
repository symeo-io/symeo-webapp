import { Configuration } from "redux/api/configurations/configurations.types";
import { environmentsColorPalettes } from "theme/colors";

export type EnvironmentColor = keyof typeof environmentsColorPalettes;

export type Environment = {
  id: string;
  name: string;
  color: EnvironmentColor;
};

export type CreateEnvironmentInput = {
  repositoryVcsId: number;
  configurationId: string;
  name: string;
  color: EnvironmentColor;
};

export type CreateEnvironmentResponse = {
  configuration: Configuration;
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
  configuration: Configuration;
};
