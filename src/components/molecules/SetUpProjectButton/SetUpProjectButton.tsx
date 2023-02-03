import { PropsWithSx } from "types/PropsWithSx";
import Button, { ButtonProps } from "components/atoms/Button/Button";
import { useCallback, useState } from "react";
import SetUpProjectDialog from "components/organisms/SetUpProjectDialog/SetUpProjectDialog";
import { Repository } from "redux/api/repositories/repositories.types";

export type SetUpProjectButtonProps = PropsWithSx & {
  dialogSx?: PropsWithSx["sx"];
  children: ButtonProps["children"];
  repository: Repository;
};

function SetUpProjectButton({
  sx,
  dialogSx,
  repository,
  children,
}: SetUpProjectButtonProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button sx={sx} onClick={handleOpenDialog}>
        {children}
      </Button>
      <SetUpProjectDialog
        repository={repository}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        sx={dialogSx}
      />
    </>
  );
}

export default SetUpProjectButton;
