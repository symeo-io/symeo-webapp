import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { CircularProgress, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { ConfigurationValues } from "redux/api/values/values.types";
import { useLazyGetValuesForEnvironmentWithSecretsQuery } from "redux/api/values/values.api";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { colors } from "theme/colors";

export type ShowSecretsButtonProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  showSecrets: boolean;
  setShowSecrets: (value: boolean) => void;
  valuesWithSecrets: ConfigurationValues | undefined;
  setValuesWithSecrets: (values: ConfigurationValues) => void;
  selectedBranchName?: string;
};
function ShowSecretsButton({
  configuration,
  environment,
  showSecrets,
  setShowSecrets,
  valuesWithSecrets,
  setValuesWithSecrets,
  selectedBranchName,
  sx,
}: ShowSecretsButtonProps) {
  const [fetchValuesWithSecrets, { isLoading }] =
    useLazyGetValuesForEnvironmentWithSecretsQuery();

  const handleClick = useCallback(async () => {
    if (!valuesWithSecrets) {
      const { data } = await fetchValuesWithSecrets({
        configurationId: configuration.id,
        repositoryVcsId: configuration.repository.vcsId,
        environmentId: environment.id,
        branch: selectedBranchName,
      });

      if (data) {
        setValuesWithSecrets(data.values);
      }
    }

    setShowSecrets(!showSecrets);
  }, [
    configuration.id,
    configuration.repository.vcsId,
    valuesWithSecrets,
    environment.id,
    fetchValuesWithSecrets,
    setValuesWithSecrets,
    setShowSecrets,
    showSecrets,
  ]);

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        width: "42px",
        ...sx,
      }}
    >
      {isLoading && (
        <CircularProgress
          size={16}
          sx={{ color: colors.secondary.text, padding: "2px" }}
        />
      )}
      {!isLoading && showSecrets && (
        <VisibilityOutlinedIcon sx={{ fontSize: "20px !important" }} />
      )}
      {!isLoading && !showSecrets && (
        <VisibilityOffOutlinedIcon sx={{ fontSize: "20px !important" }} />
      )}
    </IconButton>
  );
}

export default ShowSecretsButton;
