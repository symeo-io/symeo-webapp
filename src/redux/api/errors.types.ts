export type Error = {
  code: string;
  message: string;
  metadata: any;
};

export type ResponseWithErrors = {
  errors: Error[];
};
