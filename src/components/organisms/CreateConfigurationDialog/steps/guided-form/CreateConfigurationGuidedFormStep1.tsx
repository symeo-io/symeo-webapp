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
import { Branch, Repository } from "redux/api/repositories/repositories.types";
import { CreateConfigurationFormValues } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { useRepositories } from "hooks/useRepositories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "components/molecules/TextField/TextField";
import GitBranchIcon from "components/atoms/icons/GitBranchIcon";
import { UseFormErrors, UseFormOutput } from "hooks/useForm";
import { useBranches } from "hooks/useBranches";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { useVcsIcon } from "hooks/useVcsIcon";

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
  const VcsIcon = useVcsIcon();
  const { repositories } = useRepositories();
  const selectedRepository = useMemo(
    () =>
      repositories.find(
        (repository) => values.repositoryVcsId === repository.vcsId
      ),
    [repositories, values.repositoryVcsId]
  );

  const { branches, isLoading: isLoadingBranches } = useBranches(
    selectedRepository?.vcsId
  );
  const selectedBranch = useMemo(
    () => branches.find((branch) => values.branch === branch.name),
    [branches, values.branch]
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
              error={errors.repositoryVcsId.length > 0}
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
        <Typography variant="h3">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.branch-label",
          })}
        </Typography>
        {isLoadingBranches && (
          <LoadingBox size={34} sx={{ marginY: (theme) => theme.spacing(1) }} />
        )}
        {!isLoadingBranches && selectedBranch && (
          <Autocomplete
            value={selectedBranch}
            onChange={(event: any, newValue: Branch) => {
              newValue && setValues({ ...values, branch: newValue.name });
            }}
            options={branches}
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
                  id: "create-configuration.create-configuration-guided-form.branch-message",
                })}
                error={errors.branch.length > 0}
                InputProps={{
                  ...InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitBranchIcon />
                    </InputAdornment>
                  ),
                }}
                {...params}
              />
            )}
          />
        )}
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
