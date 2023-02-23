import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Link, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import { useUpdateConfigurationFormForm } from "components/organisms/ConfigurationGeneralSettings/useUpdateConfigurationForm";
import { Configuration } from "redux/api/configurations/configurations.types";
import {
  useUpdateGitHubConfigurationMutation,
  useValidateGitHubConfigurationMutation,
} from "redux/api/configurations/configurations.api";
import TextField from "components/molecules/TextField/TextField";
import LoadingMessage from "components/atoms/LoadingMessage/LoadingMessage";
import { debounce } from "lodash";

export type ConfigurationGeneralSettingsProps = PropsWithSx & {
  configuration: Configuration;
};

function ConfigurationGeneralSettings({
  configuration,
  sx,
}: ConfigurationGeneralSettingsProps) {
  const { formatMessage } = useIntl();
  const { values, setValues, errors, validate } =
    useUpdateConfigurationFormForm(configuration);

  const [
    validateConfiguration,
    { isLoading: isLoadingValidation, isUninitialized, data },
  ] = useValidateGitHubConfigurationMutation();

  const isConfigurationValid = useMemo(() => !!data?.isValid, [data?.isValid]);

  const debouncedValidateConfiguration = useMemo(
    () => debounce(validateConfiguration, 1000),
    [validateConfiguration]
  );

  const [updateConfiguration, { isLoading: isLoadingUpdate }] =
    useUpdateGitHubConfigurationMutation();

  const handleUpdateConfiguration = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    await updateConfiguration({
      repositoryVcsId: configuration.repository.vcsId,
      configurationId: configuration.id,
      ...values,
    });
  }, [
    configuration.id,
    configuration.repository.vcsId,
    updateConfiguration,
    validate,
    values,
  ]);

  useEffect(() => {
    if (values.branch && values.contractFilePath) {
      debouncedValidateConfiguration({
        repositoryVcsId: configuration.repository.vcsId,
        branch: values.branch,
        contractFilePath: values.contractFilePath,
      });
    }
  }, [
    configuration.repository.vcsId,
    debouncedValidateConfiguration,
    values.branch,
    values.contractFilePath,
  ]);

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h3">
        {formatMessage(
          {
            id: "configuration-settings.general.title",
          },
          { environmentName: configuration.name }
        )}
      </Typography>
      <Box sx={{ marginTop: (theme) => theme.spacing(1) }}>
        <TextField
          name="name"
          value={values.name}
          onChange={(event) =>
            setValues({ ...values, name: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "create-configuration-form.name-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "create-configuration-form.name-field-placeholder",
            },
            { repositoryName: configuration.repository.name }
          )}
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
        <TextField
          name="contractFilePath"
          value={values.contractFilePath}
          onChange={(event) =>
            setValues({ ...values, contractFilePath: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "create-configuration-form.config-contract-file-path-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "create-configuration-form.config-contract-file-path-field-placeholder",
            },
            { repositoryName: configuration.repository.name }
          )}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          error={errors.contractFilePath.length > 0}
          helperText={
            errors.contractFilePath.length > 0
              ? errors.contractFilePath
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : undefined
          }
        />
        <TextField
          name="branch"
          value={values.branch}
          onChange={(event) =>
            setValues({ ...values, branch: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "create-configuration-form.branch-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "create-configuration-form.branch-field-placeholder",
            },
            { repositoryName: configuration.repository.name }
          )}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          error={errors.branch.length > 0}
          helperText={
            errors.branch.length > 0
              ? errors.branch
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : undefined
          }
        />
        {values.branch && values.contractFilePath && !isUninitialized && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: (theme) => theme.spacing(1),
            }}
          >
            <LoadingMessage
              loading={isLoadingValidation}
              success={isConfigurationValid}
              loadingLabel={formatMessage(
                {
                  id: "create-configuration-form.validation.loading",
                },
                {
                  filePath: values.contractFilePath,
                  branch: values.branch,
                }
              )}
              errorLabel={formatMessage(
                {
                  id: "create-configuration-form.validation.error",
                },
                {
                  filePath: values.contractFilePath,
                  branch: values.branch,
                }
              )}
              successLabel={formatMessage(
                {
                  id: "create-configuration-form.validation.success",
                },
                {
                  filePath: values.contractFilePath,
                  branch: values.branch,
                }
              )}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          loading={isLoadingUpdate}
          onClick={handleUpdateConfiguration}
          disabled={!isConfigurationValid}
        >
          {formatMessage({
            id: "configuration-settings.general.update-button-label",
          })}
        </Button>
      </Box>
    </Box>
  );
}

export default ConfigurationGeneralSettings;
