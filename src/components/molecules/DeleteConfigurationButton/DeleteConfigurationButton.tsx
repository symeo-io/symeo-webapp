import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import DeleteConfigurationConfirmDialog from "components/organisms/DeleteConfigurationConfirmDialog/DeleteConfigurationConfirmDialog";
import { Configuration } from "redux/api/configurations/configurations.types";

export type DeleteConfigurationButtonProps = PropsWithSx & {
  configuration: Configuration;
  onDelete?: () => void;
};

function DeleteConfigurationButton({
  configuration,
  onDelete,
  sx,
}: DeleteConfigurationButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button color="error" onClick={handleOpenDialog} sx={{ ...sx }}>
        {formatMessage({
          id: "configuration-settings.danger-zone.delete.button-label",
        })}
      </Button>
      <DeleteConfigurationConfirmDialog
        configuration={configuration}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onDelete={onDelete}
      />
    </>
  );
}

export default DeleteConfigurationButton;
