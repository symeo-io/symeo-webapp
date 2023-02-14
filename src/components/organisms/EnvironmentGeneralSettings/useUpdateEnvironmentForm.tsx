import { useForm } from "hooks/useForm";
import { EnvironmentColor } from "redux/api/environments/environments.types";

export type UpdateEnvironmentValues = {
  name: string;

  color: EnvironmentColor;
};

export function useUpdateEnvironmentForm(
  defaultValues: UpdateEnvironmentValues
) {
  return useForm<UpdateEnvironmentValues>({
    defaultValues,
    onValidate: (values) => {
      const errors: Record<keyof UpdateEnvironmentValues, string[]> = {
        name: [],
        color: [],
      };

      if (!values.name) {
        errors.name.push("new-environment.errors.empty-name");
      }

      return errors;
    },
  });
}
