import React, { useCallback, useEffect, useMemo } from "react";
import {
  Autocomplete,
  DialogActions,
  DialogContent,
  InputAdornment,
  Typography,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import { CreateConfigurationFormValues } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "components/molecules/TextField/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";
import GitBranchIcon from "components/atoms/icons/GitBranchIcon";
import { UseFormErrors, UseFormOutput } from "hooks/useForm";

export type CreateConfigurationGuidedFormStep1Props = PropsWithSx & {
  repository?: Repository;
  values: CreateConfigurationFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<CreateConfigurationFormValues>
  >;
  errors: UseFormErrors<CreateConfigurationFormValues>;
  validate: UseFormOutput<CreateConfigurationFormValues>["validate"];
  onBack: () => void;
  onNext: () => void;
};

function CreateConfigurationGuidedFormStep1({
  repository,
  onBack,
  onNext,
  values,
  setValues,
  errors,
  validate,
  sx,
}: CreateConfigurationGuidedFormStep1Props) {
  const { formatMessage } = useIntl();
  const { repositories } = useRepositories();

  const selectedRepository = useMemo(
    () =>
      repositories.find(
        (repository) => values.repositoryVcsId === repository.vcsId
      ),
    [repositories, values.repositoryVcsId]
  );

  const handleNext = useCallback(() => {
    const hasErrors = validate("repositoryVcsId", "branch");

    if (hasErrors) {
      return;
    }

    onNext();
  }, [onNext, validate]);

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
            id: "create-configuration.create-configuration-guided-form.repository-label",
          })}
        </Typography>
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
            marginTop: (theme) => theme.spacing(1),
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
              helperText={formatMessage({
                id: "create-configuration.create-configuration-guided-form.repository-message",
              })}
              InputProps={{
                ...InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
              {...params}
            />
          )}
        />
        <Typography variant="h3">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.branch-label",
          })}
        </Typography>
        <TextField
          name="branch"
          value={values.branch}
          onChange={(event) =>
            setValues({ ...values, branch: event.target.value })
          }
          fullWidth
          placeholder={formatMessage({
            id: "create-configuration-form.branch-field-placeholder",
          })}
          sx={{
            marginTop: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(2),
          }}
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
              : formatMessage({
                  id: "create-configuration.create-configuration-guided-form.branch-message",
                })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} variant="outlined">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.back-button-label",
          })}
        </Button>
        <Button onClick={handleNext}>
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.next-button-label",
          })}
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateConfigurationGuidedFormStep1;
