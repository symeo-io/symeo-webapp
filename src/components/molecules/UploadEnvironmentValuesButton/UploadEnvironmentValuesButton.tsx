import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import React, { useCallback, useRef } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import { Editor } from "hooks/useConfigurationEditor";

export type UploadEnvironmentValuesButtonProps = PropsWithSx & {
  editor: Editor;
};
function UploadEnvironmentValuesButton({
  editor,
  sx,
}: UploadEnvironmentValuesButtonProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.click();
    }
  }, []);

  const handleUpload = useCallback(
    (inputEvent: React.ChangeEvent<HTMLInputElement>) => {
      if (inputEvent.target.files && inputEvent.target.files[0]) {
        editor.upload(inputEvent.target.files[0]);
      }
    },
    [editor]
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
