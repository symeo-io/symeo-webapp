export type ValuesVersion = {
  versionId: string;
  creationDate: Date;
};

export type GetValuesVersionsInput = {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
};

export type GetValuesVersionsResponse = {
  versions: ValuesVersion[];
};
