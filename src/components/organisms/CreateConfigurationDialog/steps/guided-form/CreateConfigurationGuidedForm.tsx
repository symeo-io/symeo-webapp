import React, { useCallback, useState } from "react";
import { Repository } from "redux/api/repositories/repositories.types";
import { useCreateConfigurationForm } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import CreateConfigurationGuidedFormStep1 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep1";
import CreateConfigurationGuidedFormStep2, {
  DEFAULT_CONTRACT,
} from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep2";
import CreateConfigurationGuidedFormStep3 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep3";
import { useCommitFileMutation } from "redux/api/repositories/repositories.api";
import { useCreateGitHubConfigurationMutation } from "redux/api/configurations/configurations.api";
import { CreateGitHubConfigurationResponse } from "redux/api/configurations/configurations.types";
import { useNavigate } from "hooks/useNavigate";

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
  const [contract, setContract] = useState<string>(DEFAULT_CONTRACT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { values, setValues, errors, validate } = useCreateConfigurationForm({
    repositoryVcsId: repository?.vcsId ?? repositories[0]?.vcsId,
  });
  const [commitFile] = useCommitFileMutation();
  const [createConfiguration] = useCreateGitHubConfigurationMutation();

  const handleSubmit = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      await commitFile({
        repositoryVcsId: values.repositoryVcsId,
        branch: values.branch,
        fileContent: contract,
        filePath: values.contractFilePath,
        commitMessage: "[SYMEO] Creating Symeo contract",
      });

      const response = (await createConfiguration({
        ...values,
      })) as { data: CreateGitHubConfigurationResponse };
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
  }, [commitFile, contract, createConfiguration, navigate, validate, values]);

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
          validate={validate}
          contract={contract}
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
