import { useForm } from "hooks/useForm";

export type SetUpProjectFormValues = {
  name: string;

  contractFilePath: string;

  branch: string;
};

export const repositoriesFormDefaultValues: SetUpProjectFormValues = {
  name: "",
  contractFilePath: "symeo.config.yml",
  branch: "",
};

export function useSetUpProjectForm() {
  return useForm<SetUpProjectFormValues>({
    defaultValues: repositoriesFormDefaultValues,
    onValidate: (values) => {
      const errors: Record<keyof SetUpProjectFormValues, string[]> = {
        name: [],
        contractFilePath: [],
        branch: [],
      };

      if (!values.name) {
        errors.name.push("set-up-project-form.errors.empty-name");
      }

      if (!values.contractFilePath) {
        errors.name.push("set-up-project-form.errors.empty-name");
      }

      if (!values.branch) {
        errors.name.push("set-up-project-form.errors.empty-name");
      }

      return errors;
    },
  });
}
