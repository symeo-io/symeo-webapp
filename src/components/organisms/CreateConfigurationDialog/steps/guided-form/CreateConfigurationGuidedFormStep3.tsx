import React, { useEffect, useMemo } from "react";
import { DialogActions, DialogContent, Typography } from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import { CreateConfigurationFormValues } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import TextField from "components/molecules/TextField/TextField";
import { UseFormErrors } from "hooks/useForm";

export type CreateConfigurationGuidedFormStep3Props = PropsWithSx & {
  repository?: Repository;
  values: CreateConfigurationFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<CreateConfigurationFormValues>
  >;
  errors: UseFormErrors<CreateConfigurationFormValues>;
  onBack: () => void;
  onSubmit: () => void;
  isLoadingSubmit: boolean;
};

function CreateConfigurationGuidedFormStep3({
  onBack,
  onSubmit,
  values,
  setValues,
  errors,
  isLoadingSubmit,
  sx,
}: CreateConfigurationGuidedFormStep3Props) {
  const { formatMessage } = useIntl();
  const { repositories } = useRepositories();

  const selectedRepository = useMemo(
    () =>
      repositories.find(
        (repository) => values.repositoryVcsId === repository.vcsId
      ),
    [repositories, values.repositoryVcsId]
  );

  useEffect(() => {
    if (selectedRepository) {
      setValues((values) => ({
        ...values,
        branch: selectedRepository.defaultBranch,
      }));
    }
  }, [selectedRepository, setValues]);

  return (
    <>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          overflow: "auto",
          ...sx,
        }}
      >
        <Typography variant="h3">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.name-label",
          })}
        </Typography>
        <TextField
          name="name"
          value={values.name}
          onChange={(event) =>
            setValues({ ...values, name: event.target.value })
          }
          fullWidth
          placeholder={formatMessage({
            id: "create-configuration-form.name-field-placeholder",
          })}
          sx={{
            marginTop: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(2),
          }}
          error={errors.name.length > 0}
          helperText={
            errors.name.length > 0
              ? errors.name
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : formatMessage({
                  id: "create-configuration.create-configuration-guided-form.name-message",
                })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} variant="outlined" disabled={isLoadingSubmit}>
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.back-button-label",
          })}
        </Button>
        <Button onClick={onSubmit} loading={isLoadingSubmit}>
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.submit-button-label",
          })}
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateConfigurationGuidedFormStep3;
