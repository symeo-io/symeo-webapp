import { useForm } from "hooks/useForm";

export type CreateConfigurationFormValues = {
  name: string;

  contractFilePath: string;

  branch: string;
};

export const createConfigurationFormDefaultValues: CreateConfigurationFormValues =
  {
    name: "",
    contractFilePath: "symeo.config.yml",
    branch: "",
  };

export function useCreateConfigurationForm() {
  return useForm<CreateConfigurationFormValues>({
    defaultValues: createConfigurationFormDefaultValues,
    onValidate: (values) => {
      const errors: Record<keyof CreateConfigurationFormValues, string[]> = {
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
