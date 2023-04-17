import React, { useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import {
  Autocomplete,
  Box,
  DialogActions,
  DialogContent,
  InputAdornment,
  Link,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import { useCreateConfigurationForm } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import TextField from "components/molecules/TextField/TextField";
import {
  useCreateConfigurationMutation,
  useValidateConfigurationMutation,
} from "redux/api/configurations/configurations.api";
import LoadingMessage from "components/atoms/LoadingMessage/LoadingMessage";
import { useNavigate } from "hooks/useNavigate";
import { CreateConfigurationResponse } from "redux/api/configurations/configurations.types";
import { colors } from "theme/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GitBranchIcon from "components/atoms/icons/GitBranchIcon";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRepositories } from "hooks/useRepositories";
import { useVcsIcon } from "hooks/useVcsIcon";

export type CreateConfigurationFastFormProps = PropsWithSx & {
  repository?: Repository;
  onCancel: () => void;
};

function CreateConfigurationFastForm({
  repository,
  onCancel,
  sx,
}: CreateConfigurationFastFormProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const VcsIcon = useVcsIcon();
  const { repositories } = useRepositories();
  const { values, setValues, errors, reset, validate } =
    useCreateConfigurationForm({
      repositoryVcsId: repository?.vcsId ?? repositories[0]?.vcsId,
    });

  const selectedRepository = useMemo(
    () =>
      repositories.find(
        (repository) => values.repositoryVcsId === repository.vcsId
      ),
    [repositories, values.repositoryVcsId]
  );

  const [
    validateConfiguration,
    { isLoading: isLoadingValidation, isUninitialized, data },
  ] = useValidateConfigurationMutation();
  const [createConfiguration, { isLoading: isLoadingCreate }] =
    useCreateConfigurationMutation();

  const isConfigurationValid = useMemo(() => !!data?.isValid, [data?.isValid]);

  const debouncedValidateConfiguration = useMemo(
    () => debounce(validateConfiguration, 1000),
    [validateConfiguration]
  );

  const handleCreateConfiguration = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

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
  }, [createConfiguration, navigate, validate, values]);

  const handleCancel = useCallback(() => {
    reset();
    onCancel();
  }, [onCancel, reset]);

  useEffect(() => {
    if (selectedRepository) {
      setValues((values) => ({
        ...values,
        branch: selectedRepository.defaultBranch,
      }));
    }
  }, [selectedRepository, setValues]);

  useEffect(() => {
    if (values.branch && values.contractFilePath) {
      debouncedValidateConfiguration({
        repositoryVcsId: values.repositoryVcsId,
        branch: values.branch,
        contractFilePath: values.contractFilePath,
      });
    }
  }, [
    debouncedValidateConfiguration,
    values.repositoryVcsId,
    values.branch,
    values.contractFilePath,
  ]);

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
        <Autocomplete
          value={selectedRepository}
          onChange={(event: any, newValue: Repository) => {
            newValue &&
              setValues({ ...values, repositoryVcsId: newValue.vcsId });
          }}
          disabled={!!repository}
          options={repositories}
          getOptionLabel={(option) => option.name}
          sx={{
            marginBottom: (theme) => theme.spacing(2),
            "& .MuiInputBase-root.MuiInput-root.MuiInputBase-root": {
              marginTop: 0,
              height: "42px",
              paddingY: 0,
            },
            "& .MuiAutocomplete-popupIndicator": { border: 0 },
            "& .MuiAutocomplete-endAdornment": {
              right: "4px",
              "& .MuiSvgIcon-root": { fontSize: "1.5rem" },
            },
          }}
          disableClearable
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={({ InputProps, ...params }) => (
            <TextField
              required
              label={formatMessage({
                id: "create-configuration-form.repository-field-label",
              })}
              InputProps={{
                ...InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <VcsIcon />
                  </InputAdornment>
                ),
              }}
              {...params}
            />
          )}
        />
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
          placeholder={formatMessage({
            id: "create-configuration-form.name-field-placeholder",
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
          placeholder={formatMessage({
            id: "create-configuration-form.config-contract-file-path-field-placeholder",
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          error={errors.contractFilePath.length > 0}
          helperText={
            errors.contractFilePath.length > 0
              ? errors.contractFilePath
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : undefined
          }
        />
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(0.5),
            marginBottom: (theme) => theme.spacing(2),
            color: colors.secondary.text,
            fontSize: "12px",
          }}
        >
          {formatMessage({
            id: "create-configuration-form.contract-help-message",
          })}
          <Link
            href="https://docs.symeo.io/docs/category/getting-started"
            target="_blank"
          >
            {formatMessage({
              id: "create-configuration-form.here",
            })}
          </Link>
          .
        </Box>
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
          placeholder={formatMessage({
            id: "create-configuration-form.branch-field-placeholder",
          })}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitBranchIcon />
              </InputAdornment>
            ),
          }}
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          disabled={isLoadingCreate}
        >
          {formatMessage({
            id: "create-configuration-form.cancel-button-label",
          })}
        </Button>
        <Button
          onClick={handleCreateConfiguration}
          disabled={!isConfigurationValid}
          loading={isLoadingCreate}
        >
          {formatMessage({
            id: "create-configuration-form.set-up-button-label",
          })}
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateConfigurationFastForm;
