import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import Button from "components/atoms/Button/Button";
import { useUpdateEnvironmentMutation } from "redux/api/environments/environments.api";
import { useUpdateEnvironmentForm } from "components/organisms/EnvironmentGeneralSettings/useUpdateEnvironmentForm";
import TextField from "components/molecules/TextField/TextField";
import EnvironmentColorSelector from "components/molecules/EnvironmentColorSelector/EnvironmentColorSelector";

export type EnvironmentGeneralSettingsProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
};

function EnvironmentGeneralSettings({
  repositoryVcsId,
  configurationId,
  environment,
  sx,
}: EnvironmentGeneralSettingsProps) {
  const { formatMessage } = useIntl();
  const { values, setValues, errors, validate } =
    useUpdateEnvironmentForm(environment);

  const [updateEnvironment, { isLoading: isLoadingUpdate }] =
    useUpdateEnvironmentMutation();

  const handleUpdateEnvironment = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    await updateEnvironment({
      repositoryVcsId,
      configurationId,
      environmentId: environment.id,
      ...values,
    });
  }, [
    configurationId,
    environment.id,
    repositoryVcsId,
    updateEnvironment,
    validate,
    values,
  ]);

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3">
        {formatMessage(
          {
            id: "environment-settings.general.title",
          },
          { environmentName: environment.name }
        )}
      </Typography>
      <Box>
        <TextField
          name="name"
          value={values.name}
          onChange={(event) =>
            setValues({ ...values, name: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "new-environment.name-field-label",
          })}
          placeholder={formatMessage({
            id: "new-environment.name-field-placeholder",
          })}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          error={errors.name.length > 0}
          helperText={
            errors.name.length > 0
              ? errors.name
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : undefined
          }
        />
        <EnvironmentColorSelector
          label={formatMessage({
            id: "new-environment.color-field-label",
          })}
          required
          value={values.color}
          onChange={(color) => setValues({ ...values, color })}
        />
      </Box>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button loading={isLoadingUpdate} onClick={handleUpdateEnvironment}>
          {formatMessage({
            id: "environment-settings.general.update-button-label",
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default EnvironmentGeneralSettings;
