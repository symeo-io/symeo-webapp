import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import React, { useCallback, useMemo, useRef } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { useGetConfigurationContractQuery } from "redux/api/configurations/configurations.api";
import { Configuration } from "redux/api/configurations/configurations.types";
import YAML from "yamljs";
import { ConfigurationValues } from "redux/api/values/values.types";
import { initializeConfig } from "services/contract/contract.utils";
import { merge } from "lodash";

export type UploadEnvironmentValuesButtonProps = PropsWithSx & {
  editorValues: ConfigurationValues;
  setEditorValues: (values: ConfigurationValues) => void;
  configuration: Configuration;
  branch?: string;
};
function UploadEnvironmentValuesButton({
  editorValues,
  setEditorValues,
  configuration,
  branch,
  sx,
}: UploadEnvironmentValuesButtonProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  const { data: configurationContractData } = useGetConfigurationContractQuery({
    configurationId: configuration.id,
    repositoryVcsId: configuration.repository.vcsId,
    branch,
  });

  const contract = useMemo(
    () => configurationContractData?.contract,
    [configurationContractData?.contract]
  );

  const handleUploadClick = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.click();
    }
  }, []);

  const handleUpload = useCallback(
    (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
      if (inputEvent.target.files && inputEvent.target.files[0]) {
        const reader = new FileReader();
        reader.onload = async (readerEvent) => {
          const yamlString = readerEvent.target?.result;
          if (typeof yamlString === "string" && contract) {
            const values = YAML.parse(yamlString);
            setEditorValues(
              initializeConfig(contract, merge(editorValues, values))
            );
          }
        };
        reader.readAsText(inputEvent.target.files[0]);
      }
    },
    [contract, editorValues, setEditorValues]
  );

  return (
    <>
      <IconButton
        onClick={handleUploadClick}
        sx={{
          width: "42px",
          ...sx,
        }}
      >
        <FileUploadOutlinedIcon sx={{ fontSize: "20px !important" }} />
      </IconButton>
      <input
        type="file"
        accept=".yml,.yaml,application/x-yaml"
        ref={inputEl}
        onChange={handleUpload}
        hidden
      />
    </>
  );
}

export default UploadEnvironmentValuesButton;
