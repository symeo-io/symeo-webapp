import { PropsWithSx } from "types/PropsWithSx";
import { ApiKey } from "redux/api/api-keys/api-keys.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import DeleteApiKeyConfirmDialog from "components/organisms/DeleteApiKeyConfirmDialog/DeleteApiKeyConfirmDialog";

export type DeleteApiKeyButtonProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environmentId: string;
  apiKey: ApiKey;
};

function DeleteApiKeyButton({
  repositoryVcsId,
  configurationId,
  environmentId,
  apiKey,
  sx,
}: DeleteApiKeyButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Box
        onClick={handleOpenDialog}
        sx={{ height: "20px", width: "20px", cursor: "pointer", ...sx }}
      >
        <DeleteIcon sx={{ fontSize: "20px" }} />
      </Box>
      <DeleteApiKeyConfirmDialog
        repositoryVcsId={repositoryVcsId}
        configurationId={configurationId}
        environmentId={environmentId}
        apiKey={apiKey}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default DeleteApiKeyButton;
