import { useForm } from "hooks/useForm";
import { validateContractFormat } from "services/contract/contract.validator";
import { YamlUtils } from "services/yaml/yaml.utils";

export const defaultContract = `database:
  host:
    type: string
  port:
    type: integer
  name:
    type: string
  user:
    type: string
  password:
    type: string
    secret: true
`;

export type ContractFormValues = {
  contract: string;
};

export const contractFormDefaultValues: ContractFormValues = {
  contract: defaultContract,
};

export function useContractForm(initialValues?: Partial<ContractFormValues>) {
  return useForm<ContractFormValues>({
    defaultValues: {
      ...contractFormDefaultValues,
      ...initialValues,
    },
    onValidate: (values) => {
      const contractErrors = validateContractFormat(
        YamlUtils.parse(values.contract)
      );
      const errors: Record<keyof ContractFormValues, string[]> = {
        contract: contractErrors,
      };

      return errors;
    },
  });
}
