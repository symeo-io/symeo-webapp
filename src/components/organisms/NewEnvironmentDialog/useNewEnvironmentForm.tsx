import { useForm } from "hooks/useForm";
import { EnvironmentColor } from "redux/api/configurations/configurations.types";

export type NewEnvironmentValues = {
  name: string;

  color: EnvironmentColor;
};

export const repositoriesFormDefaultValues: NewEnvironmentValues = {
  name: "",
  color: "blue",
};

export function useNewEnvironment() {
  return useForm<NewEnvironmentValues>({
    defaultValues: repositoriesFormDefaultValues,
    onValidate: (values) => {
      const errors: Record<keyof NewEnvironmentValues, string[]> = {
        name: [],
        color: [],
      };

      if (!values.name) {
        errors.name.push("set-up-project-form.errors.empty-name");
      }

      return errors;
    },
  });
}
