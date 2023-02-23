import { useForm } from "hooks/useForm";

export type UpdateConfigurationFormValues = {
  name: string;

  contractFilePath: string;

  branch: string;
};

export function useUpdateConfigurationFormForm(
  initialValues: UpdateConfigurationFormValues
) {
  return useForm<UpdateConfigurationFormValues>({
    defaultValues: initialValues,
    onValidate: (values) => {
      const errors: Record<keyof UpdateConfigurationFormValues, string[]> = {
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
