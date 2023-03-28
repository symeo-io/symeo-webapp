import { useForm } from "hooks/useForm";

export const defaultContractFileName = "symeo.config.yml";

export type CreateConfigurationFormValues = {
  repositoryVcsId: number;
  name: string;

  contractFilePath: string;

  branch: string;
};

export const createConfigurationFormDefaultValues: CreateConfigurationFormValues =
  {
    repositoryVcsId: 0,
    name: "",
    contractFilePath: defaultContractFileName,
    branch: "",
  };

export function useCreateConfigurationForm(
  initialValues?: Partial<CreateConfigurationFormValues>
) {
  return useForm<CreateConfigurationFormValues>({
    defaultValues: {
      ...createConfigurationFormDefaultValues,
      ...initialValues,
    },
    onValidate: (values) => {
      const errors: Record<keyof CreateConfigurationFormValues, string[]> = {
        repositoryVcsId: [],
        name: [],
        contractFilePath: [],
        branch: [],
      };

      if (!values.repositoryVcsId) {
        errors.repositoryVcsId.push(
          "create-configuration-form.errors.empty-repository"
        );
      }

      if (!values.name) {
        errors.name.push("create-configuration-form.errors.empty-name");
      }

      if (!values.contractFilePath) {
        errors.contractFilePath.push(
          "create-configuration-form.errors.empty-path"
        );
      }

      if (!values.branch) {
        errors.branch.push("create-configuration-form.errors.empty-branch");
      }

      return errors;
    },
  });
}
