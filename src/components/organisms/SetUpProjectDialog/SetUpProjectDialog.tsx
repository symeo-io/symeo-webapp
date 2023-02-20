import React, { useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import { useSetUpProjectForm } from "components/organisms/SetUpProjectDialog/useSetUpProjectForm";
import TextField from "components/molecules/TextField/TextField";
import {
  useCreateGitHubConfigurationMutation,
  useValidateGitHubConfigurationMutation,
} from "redux/api/configurations/configurations.api";
import LoadingMessage from "components/atoms/LoadingMessage/LoadingMessage";
import { useNavigate } from "hooks/useNavigate";
import { CreateGitHubConfigurationResponse } from "redux/api/configurations/configurations.types";
import { colors } from "theme/colors";

export type SetUpProjectDialogProps = PropsWithSx & {
  repository: Repository;
  open: boolean;
  handleClose: () => void;
};

function SetUpProjectDialog({
  repository,
  open,
  handleClose,
  sx,
}: SetUpProjectDialogProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { values, setValues, errors, reset, validate } = useSetUpProjectForm();

  const [
    validateConfiguration,
    { isLoading: isLoadingValidation, isUninitialized, data },
  ] = useValidateGitHubConfigurationMutation();
  const [createConfiguration, { isLoading: isLoadingCreate }] =
    useCreateGitHubConfigurationMutation();

  const isConfigurationValid = useMemo(() => !!data?.isValid, [data?.isValid]);

  const debouncedValidateConfiguration = useMemo(
    () => debounce(validateConfiguration, 1000),
    [validateConfiguration]
  );

  const handleSetUpProject = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    const response = (await createConfiguration({
      repositoryVcsId: repository.vcsId,
      ...values,
    })) as { data: CreateGitHubConfigurationResponse };
    navigate("configuration", {
      params: {
        organizationName: response.data.configuration.owner.name,
        repositoryVcsId: response.data.configuration.repository.vcsId,
        configurationId: response.data.configuration.id,
      },
    });
  }, [createConfiguration, navigate, repository.vcsId, validate, values]);

  const handleCloseAndReset = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  useEffect(() => {
    if (values.branch && values.contractFilePath) {
      debouncedValidateConfiguration({
        repositoryVcsId: repository.vcsId,
        branch: values.branch,
        contractFilePath: values.contractFilePath,
      });
    }
  }, [
    debouncedValidateConfiguration,
    repository.vcsId,
    values.branch,
    values.contractFilePath,
  ]);

  return (
    <Dialog open={open} onClose={handleCloseAndReset} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage(
          {
            id: "set-up-project-form.title",
          },
          { repositoryName: repository.name }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          height: "300px",
          overflow: "auto",
        }}
      >
        <TextField
          name="name"
          value={values.name}
          onChange={(event) =>
            setValues({ ...values, name: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "set-up-project-form.name-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "set-up-project-form.name-field-placeholder",
            },
            { repositoryName: repository.name }
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
            id: "set-up-project-form.config-contract-file-path-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "set-up-project-form.config-contract-file-path-field-placeholder",
            },
            { repositoryName: repository.name }
          )}
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
            id: "set-up-project-form.contract-help-message",
          })}
          <Link
            href="https://docs.symeo.io/docs/getting-started"
            target="_blank"
          >
            {formatMessage({
              id: "set-up-project-form.here",
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
            id: "set-up-project-form.branch-field-label",
          })}
          placeholder={formatMessage(
            {
              id: "set-up-project-form.branch-field-placeholder",
            },
            { repositoryName: repository.name }
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
                  id: "set-up-project-form.validation.loading",
                },
                {
                  filePath: values.contractFilePath,
                  branch: values.branch,
                }
              )}
              errorLabel={formatMessage(
                {
                  id: "set-up-project-form.validation.error",
                },
                {
                  filePath: values.contractFilePath,
                  branch: values.branch,
                }
              )}
              successLabel={formatMessage(
                {
                  id: "set-up-project-form.validation.success",
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
          onClick={handleCloseAndReset}
          variant="outlined"
          disabled={isLoadingCreate}
        >
          {formatMessage({ id: "set-up-project-form.cancel-button-label" })}
        </Button>
        <Button
          onClick={handleSetUpProject}
          disabled={!isConfigurationValid}
          loading={isLoadingCreate}
        >
          {formatMessage({
            id: "set-up-project-form.set-up-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SetUpProjectDialog;
