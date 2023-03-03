import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { IconButton } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { useGetValuesForEnvironmentQuery } from "redux/api/values/values.api";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { saveAs } from "file-saver";
import { toYamlString } from "services/contract/contract.utils";

function buildFileName(
  configuration: Configuration,
  environment: Environment
): string {
  return `${configuration.name
    .toLowerCase()
    .replace(" ", "-")}-${environment.name
    .toLowerCase()
    .replace(" ", "-")}.yml`;
}

export type DownloadEnvironmentValuesButtonProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  branch?: string;
};
function DownloadEnvironmentValuesButton({
  configuration,
  environment,
  branch,
  sx,
}: DownloadEnvironmentValuesButtonProps) {
  const { data: configurationContractData } = useGetConfigurationContractQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    branch,
  });

  const { data: valuesData } = useGetValuesForEnvironmentQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    environmentId: environment.id,
  });

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  const values = useMemo(() => valuesData?.values, [valuesData?.values]);

  const handleDownload = useCallback(() => {
    if (values && contract) {
      const blob = new Blob([toYamlString(contract, values)], {
        type: "application/x-yaml;charset=utf-8",
      });
      saveAs(blob, buildFileName(configuration, environment));
    }
  }, [configuration, contract, environment, values]);

  return (
    <IconButton
      onClick={handleDownload}
      sx={{
        width: "42px",
        ...sx,
      }}
    >
      <FileDownloadOutlinedIcon sx={{ fontSize: "20px !important" }} />
    </IconButton>
  );
}

export default DownloadEnvironmentValuesButton;
