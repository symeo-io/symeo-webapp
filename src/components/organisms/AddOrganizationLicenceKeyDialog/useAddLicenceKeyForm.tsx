import { useForm } from "hooks/useForm";

export type AddLicenceKeyValues = {
  key: string;
};

export function useAddLicenceKeyForm(defaultValues: AddLicenceKeyValues) {
  return useForm<AddLicenceKeyValues>({
    defaultValues,
    onValidate: (values) => {
      const errors: Record<keyof AddLicenceKeyValues, string[]> = {
        key: [],
      };

      if (!values.key) {
        errors.key.push(
          "organization-settings.plan.add-licence-key.errors.empty-key"
        );
      }

      return errors;
    },
  });
}
