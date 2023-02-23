import { PropsWithSx } from "types/PropsWithSx";
import Button, { ButtonProps } from "components/atoms/Button/Button";
import { useCallback, useState } from "react";
import CreateConfigurationDialog from "components/organisms/CreateConfigurationDialog/CreateConfigurationDialog";
import { Repository } from "redux/api/repositories/repositories.types";

export type AddConfigurationButtonProps = PropsWithSx & {
  dialogSx?: PropsWithSx["sx"];
  children: ButtonProps["children"];
  repository: Repository;
};

function AddConfigurationButton({
  sx,
  dialogSx,
  repository,
  children,
}: AddConfigurationButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button sx={sx} onClick={handleOpenDialog}>
        {children}
      </Button>
      <CreateConfigurationDialog
        repository={repository}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        sx={dialogSx}
      />
    </>
  );
}

export default AddConfigurationButton;
