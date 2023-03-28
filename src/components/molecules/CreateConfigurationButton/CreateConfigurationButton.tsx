import { PropsWithChildren, useCallback, useState } from "react";
import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import CreateConfigurationDialog from "components/organisms/CreateConfigurationDialog/CreateConfigurationDialog";
import { Repository } from "redux/api/repositories/repositories.types";

export type CreateConfigurationButtonProps = PropsWithSx &
  PropsWithChildren & {
    repository?: Repository;
  };

function CreateConfigurationButton({
  children,
  repository,
  sx,
}: CreateConfigurationButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button onClick={handleOpenDialog} sx={{ ...sx }}>
        {children}
      </Button>
      <CreateConfigurationDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        repository={repository}
      />
    </>
  );
}

export default CreateConfigurationButton;
