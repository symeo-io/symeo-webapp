import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  DialogActions,
  DialogContent,
  InputAdornment,
  styled,
  Typography,
} from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import {
  CreateConfigurationFormValues,
  defaultContractFileName,
} from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { UseFormErrors, UseFormOutput } from "hooks/useForm";
import { useGetRepositoryEnvFilesQuery } from "redux/api/repositories/repositories.api";
import RawCodeEditor from "@uiw/react-textarea-code-editor";
import LoadingBox from "components/molecules/LoadingBox/LoadingBox";
import { EnvFile } from "redux/api/repositories/repositories.types";
import Code from "components/atoms/Code/Code";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "components/molecules/TextField/TextField";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { colors } from "theme/colors";

const CodeEditor = styled(RawCodeEditor)({});

export const DEFAULT_CONTRACT = `database:
  host:
    type: string
  port:
    type: integer
  name:
    type: string
  user:
    type: string
  password:
    type: string
    secret: true
`;

export type CreateConfigurationGuidedFormStep2Props = PropsWithSx & {
  values: CreateConfigurationFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<CreateConfigurationFormValues>
  >;
  errors: UseFormErrors<CreateConfigurationFormValues>;
  validate: UseFormOutput<CreateConfigurationFormValues>["validate"];
  contract: string;
  setContract: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
};

function generateContractPathFromEnvFilePath(envFilePath: string): string {
  const directoryPath = envFilePath.split("/").slice(0, -1).join("/");

  if (directoryPath === "") {
    return defaultContractFileName;
  }

  return `${directoryPath}/${defaultContractFileName}`;
}

function CreateConfigurationGuidedFormStep2({
  onBack,
  onNext,
  contract,
  setContract,
  values,
  setValues,
  errors,
  validate,
  sx,
}: CreateConfigurationGuidedFormStep2Props) {
  const { formatMessage } = useIntl();
  const [selectedEnvFile, setSelectedEnvFile] = useState<EnvFile | undefined>(
    undefined
  );
  const { data: envFilesData, isLoading: isLoadingEnvFiles } =
    useGetRepositoryEnvFilesQuery({
      repositoryVcsId: values.repositoryVcsId,
      branch: values.branch,
    });

  const envFiles = useMemo(() => envFilesData?.files ?? [], [envFilesData]);

  const handleNext = useCallback(() => {
    const hasErrors = validate("contractFilePath");

    if (hasErrors) {
      return;
    }

    onNext();
  }, [onNext, validate]);

  useEffect(() => {
    if (envFiles.length > 0) {
      setSelectedEnvFile(envFiles[0]);
    }
  }, [envFiles]);

  useEffect(() => {
    if (selectedEnvFile) {
      setContract(selectedEnvFile.contract);
      setValues((values) => ({
        ...values,
        contractFilePath: generateContractPathFromEnvFilePath(
          selectedEnvFile.path
        ),
      }));
    } else {
      setContract(DEFAULT_CONTRACT);
      setValues((values) => ({
        ...values,
        contractFilePath: defaultContractFileName,
      }));
    }
  }, [selectedEnvFile, setContract, setValues]);

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
        {isLoadingEnvFiles && (
          <LoadingBox sx={{ paddingY: (theme) => theme.spacing(3) }} />
        )}
        {!isLoadingEnvFiles && (
          <Box>
            <Typography variant="h3">
              {formatMessage({
                id: "create-configuration.create-configuration-guided-form.contract-label",
              })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: (theme) => theme.spacing(1) }}
            >
              {envFiles.length === 0 &&
                formatMessage({
                  id: "create-configuration.create-configuration-guided-form.contract-messages.no-env-file",
                })}
              {envFiles.length === 1 && selectedEnvFile && (
                <>
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-messages.one-env-file1",
                  })}{" "}
                  <Code>{selectedEnvFile.path}</Code>{" "}
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-messages.one-env-file2",
                  })}
                </>
              )}
              {envFiles.length > 1 &&
                formatMessage({
                  id: "create-configuration.create-configuration-guided-form.contract-messages.multiple-env-files",
                })}
            </Typography>
            {envFiles.length > 1 && selectedEnvFile && (
              <Autocomplete
                value={selectedEnvFile}
                onChange={(event: any, newValue: EnvFile) => {
                  newValue && setSelectedEnvFile(newValue);
                }}
                options={envFiles}
                getOptionLabel={(option) => option.path}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
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
                renderInput={({ ...params }) => <TextField {...params} />}
              />
            )}
            <Box
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: (theme) => theme.spacing(3),
              }}
            >
              <Box
                sx={{
                  maxHeight: "350px",
                  overflow: "auto",
                  backgroundColor: "rgb(19, 22, 38)",

                  "&::-webkit-scrollbar": {
                    width: "18px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                    padding: "5px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "9999px",
                    border: "6px solid rgba(0, 0, 0, 0)",
                    backgroundClip: "padding-box",
                  },
                }}
              >
                <CodeEditor
                  data-color-mode="dark"
                  value={contract}
                  language="yaml"
                  placeholder="Please enter contract."
                  onChange={(evn) => setContract(evn.target.value)}
                  padding={15}
                  sx={{
                    backgroundColor: "rgb(19, 22, 38)",
                    fontSize: 16,
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",

                    "& .language-yaml.code-highlight .code-line": {
                      color: "rgb(105, 211, 167)",
                    },

                    "& .language-yaml.code-highlight .token.atrule": {
                      color: "rgb(160, 108, 228)",
                    },

                    "& .language-yaml.code-highlight .token.punctuation": {
                      color: "rgb(160, 108, 228)",
                    },

                    "& .language-yaml.code-highlight .token.boolean": {
                      color: "rgb(243, 195, 100)",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: (theme) => theme.spacing(1),
                border: `1px solid ${colors.secondary.borders}`,
                borderRadius: "8px",
                backgroundColor: colors.secondary.surface,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: (theme) => theme.spacing(1),
                  paddingLeft: (theme) => theme.spacing(2),
                }}
              >
                <InfoOutlinedIcon />
              </Box>
              <Box sx={{ padding: (theme) => theme.spacing(1) }}>
                <Typography>
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-documentation.nesting",
                  })}
                </Typography>
                <Typography>
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-documentation.types.start",
                  })}{" "}
                  <Code>boolean</Code>, <Code>string</Code>,{" "}
                  <Code>integer</Code>{" "}
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-documentation.types.and",
                  })}{" "}
                  <Code>float</Code>
                </Typography>
                <Typography>
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-documentation.flags.start",
                  })}{" "}
                  <Code>optional: true</Code>{" "}
                  {formatMessage({
                    id: "create-configuration.create-configuration-guided-form.contract-documentation.flags.or",
                  })}{" "}
                  <Code>secret: true</Code>
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h3"
              sx={{ marginTop: (theme) => theme.spacing(3) }}
            >
              {formatMessage({
                id: "create-configuration.create-configuration-guided-form.contract-file-path-label",
              })}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: (theme) => theme.spacing(1) }}
            >
              {formatMessage({
                id: "create-configuration.create-configuration-guided-form.contract-file-path-message1",
              })}{" "}
              <Code>{values.branch}</Code>{" "}
              {formatMessage({
                id: "create-configuration.create-configuration-guided-form.contract-file-path-message2",
              })}
            </Typography>
            <TextField
              sx={{ marginTop: (theme) => theme.spacing(1) }}
              name="contractFilePath"
              value={values.contractFilePath}
              onChange={(event) =>
                setValues({ ...values, contractFilePath: event.target.value })
              }
              fullWidth
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
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} variant="outlined">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.back-button-label",
          })}
        </Button>
        <Button onClick={handleNext} disabled={isLoadingEnvFiles}>
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.next-button-label",
          })}
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateConfigurationGuidedFormStep2;
