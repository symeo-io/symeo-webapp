import { useForm } from "hooks/useForm";
import { EnvironmentColor } from "redux/api/environments/environments.types";

export type NewEnvironmentValues = {
  name: string;

  color: EnvironmentColor;
};

export const newEnvironmentFormDefaultValues: NewEnvironmentValues = {
  name: "",
  color: "blue",
};

export function useNewEnvironment() {
  return useForm<NewEnvironmentValues>({
    defaultValues: newEnvironmentFormDefaultValues,
    onValidate: (values) => {
      const errors: Record<keyof NewEnvironmentValues, string[]> = {
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
