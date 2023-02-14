import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Environment } from "redux/api/environments/environments.types";
import Button from "components/atoms/Button/Button";
import DeleteEnvironmentConfirmDialog from "components/organisms/DeleteEnvironmentConfirmDialog/DeleteEnvironmentConfirmDialog";

export type DeleteEnvironmentButtonProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationId: string;
  environment: Environment;
  onDelete?: () => void;
};

function DeleteEnvironmentButton({
  repositoryVcsId,
  configurationId,
  environment,
  onDelete,
  sx,
}: DeleteEnvironmentButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button color="error" onClick={handleOpenDialog} sx={{ ...sx }}>
        {formatMessage({
          id: "environment-settings.danger-zone.delete.button-label",
        })}
      </Button>
      <DeleteEnvironmentConfirmDialog
        repositoryVcsId={repositoryVcsId}
        configurationId={configurationId}
        environment={environment}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onDelete={onDelete}
      />
    </>
  );
}

export default DeleteEnvironmentButton;
