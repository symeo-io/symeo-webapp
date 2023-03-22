import { useForm } from "hooks/useForm";

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
    contractFilePath: "symeo.config.yml",
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

      if (!values.name) {
        errors.name.push("create-configuration-form.errors.empty-name");
      }

      if (!values.contractFilePath) {
        errors.name.push("create-configuration-form.errors.empty-name");
      }

      if (!values.branch) {
        errors.name.push("create-configuration-form.errors.empty-name");
      }

      return errors;
    },
  });
}
