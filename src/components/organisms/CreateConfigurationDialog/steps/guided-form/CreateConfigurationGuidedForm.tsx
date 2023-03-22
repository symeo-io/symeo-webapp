import React, { useState } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import { useCreateConfigurationForm } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import CreateConfigurationGuidedFormStep1 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep1";
import CreateConfigurationGuidedFormStep2 from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedFormStep2";

export type CreateConfigurationGuidedFormProps = PropsWithSx & {
  repository?: Repository;
  onCancel: () => void;
};

function CreateConfigurationGuidedForm({
  repository,
  onCancel,
  sx,
}: CreateConfigurationGuidedFormProps) {
  const [step, setStep] = useState<number>(1);
  const { repositories } = useRepositories();
  const { values, setValues, errors } = useCreateConfigurationForm({
    repositoryVcsId: repository?.vcsId ?? repositories[0]?.vcsId,
  });

  return (
    <>
      {step === 1 && (
        <CreateConfigurationGuidedFormStep1
          repository={repository}
          values={values}
          setValues={setValues}
          errors={errors}
          onBack={onCancel}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <CreateConfigurationGuidedFormStep2
          values={values}
          setValues={setValues}
          errors={errors}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
    </>
  );
}

export default CreateConfigurationGuidedForm;
