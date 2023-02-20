import React, { useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import TextField from "components/molecules/TextField/TextField";
import { useNewEnvironment } from "components/organisms/NewEnvironmentDialog/useNewEnvironmentForm";
import { useCreateEnvironmentMutation } from "redux/api/environments/environments.api";
import Button from "components/atoms/Button/Button";
import EnvironmentColorSelector from "components/molecules/EnvironmentColorSelector/EnvironmentColorSelector";
import {
  CreateEnvironmentResponse,
  Environment,
} from "redux/api/environments/environments.types";

export type NewEnvironmentDialogProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationName: string;
  configurationId: string;
  open: boolean;
  handleClose: () => void;
  onCreate?: (environment: Environment) => void;
};

function NewEnvironmentDialog({
  repositoryVcsId,
  configurationId,
  configurationName,
  open,
  handleClose,
  onCreate,
  sx,
}: NewEnvironmentDialogProps) {
  const { formatMessage } = useIntl();
  const { values, setValues, errors, reset, validate } = useNewEnvironment();
  const [createEnvironment, { isLoading: isLoadingCreate }] =
    useCreateEnvironmentMutation();

  const handleCloseAndReset = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  const handleCreateEnvironment = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    const { data: createdEnvironmentData } = (await createEnvironment({
      repositoryVcsId,
      configurationId,
      ...values,
    })) as { data: CreateEnvironmentResponse };

    if (onCreate) {
      onCreate(createdEnvironmentData.environment);
    }

    handleCloseAndReset();
  }, [
    configurationId,
    createEnvironment,
    handleCloseAndReset,
    repositoryVcsId,
    validate,
    values,
  ]);

  return (
    <Dialog open={open} onClose={handleCloseAndReset} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage(
          {
            id: "new-environment.title",
          },
          { configurationName }
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAndReset}
          variant="outlined"
          disabled={isLoadingCreate}
        >
          {formatMessage({ id: "new-environment.cancel-button-label" })}
        </Button>
        <Button onClick={handleCreateEnvironment} loading={isLoadingCreate}>
          {formatMessage({
            id: "new-environment.create-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewEnvironmentDialog;
