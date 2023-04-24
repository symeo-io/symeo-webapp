import React, { useCallback, useState } from "react";
import { Repository } from "redux/api/repositories/repositories.types";
import { useCreateConfigurationForm } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import CreateConfigurationGuidedFormStep1 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep1";
import CreateConfigurationGuidedFormStep2 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep2";
import CreateConfigurationGuidedFormStep3 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep3";
import { useCommitFileMutation } from "redux/api/repositories/repositories.api";
import { useCreateConfigurationMutation } from "redux/api/configurations/configurations.api";
import { CreateConfigurationResponse } from "redux/api/configurations/configurations.types";
import { useNavigate } from "hooks/useNavigate";
import { useContractForm } from "components/organisms/CreateConfigurationDialog/steps/guided-form/useContractForm";

export type CreateConfigurationGuidedFormProps = {
  repository?: Repository;
  onCancel: () => void;
};

function CreateConfigurationGuidedForm({
  repository,
  onCancel,
}: CreateConfigurationGuidedFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const { repositories } = useRepositories();
  const {
    values: contractValues,
    setValues: setContractValues,
    validate: validateContractValues,
    errors: contractErrors,
  } = useContractForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { values, setValues, errors, validate } = useCreateConfigurationForm({
    repositoryVcsId: repository?.vcsId ?? repositories[0]?.vcsId,
  });
  const [commitFile] = useCommitFileMutation();
  const [createConfiguration] = useCreateConfigurationMutation();

  const setContract = useCallback(
    (value: string) =>
      setContractValues((previousValues) => ({
        ...previousValues,
        contract: value,
      })),
    [setContractValues]
  );

  const handleSubmit = useCallback(async () => {
    const hasErrors = validate() || validateContractValues();

    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      await commitFile({
        repositoryVcsId: values.repositoryVcsId,
        branch: values.branch,
        fileContent: contractValues.contract,
        filePath: values.contractFilePath,
        commitMessage: "[SYMEO] Creating Symeo contract",
      });

      const response = (await createConfiguration({
        ...values,
      })) as { data: CreateConfigurationResponse };
      navigate("configuration", {
        params: {
          organizationName: response.data.configuration.owner.name,
          repositoryVcsId: response.data.configuration.repository.vcsId,
          configurationId: response.data.configuration.id,
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    commitFile,
    contractValues.contract,
    createConfiguration,
    navigate,
    validate,
    validateContractValues,
    values,
  ]);

  return (
    <>
      {step === 1 && (
        <CreateConfigurationGuidedFormStep1
          repository={repository}
          values={values}
          setValues={setValues}
          errors={errors}
          validate={validate}
          onBack={onCancel}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <CreateConfigurationGuidedFormStep2
          values={values}
          setValues={setValues}
          errors={errors}
          contractErrors={contractErrors}
          validate={validate}
          validateContract={validateContractValues}
          contract={contractValues.contract}
          setContract={setContract}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <CreateConfigurationGuidedFormStep3
          values={values}
          setValues={setValues}
          errors={errors}
          validate={validate}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          isLoadingSubmit={isLoading}
        />
      )}
    </>
  );
}

export default CreateConfigurationGuidedForm;
