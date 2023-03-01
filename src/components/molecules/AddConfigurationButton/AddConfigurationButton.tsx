import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import { useCallback, useState } from "react";
import CreateConfigurationDialog from "components/organisms/CreateConfigurationDialog/CreateConfigurationDialog";
import { Repository } from "redux/api/repositories/repositories.types";
import { Box, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

export type AddConfigurationButtonProps = PropsWithSx & {
  dialogSx?: PropsWithSx["sx"];
  repository: Repository;
};

function AddConfigurationButton({
  sx,
  dialogSx,
  repository,
}: AddConfigurationButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Tooltip
        title={
          !repository.isCurrentUserAdmin &&
          formatMessage({ id: "projects.repositories.non-admin-message" })
        }
      >
        <Box>
          <Button
            sx={sx}
            onClick={handleOpenDialog}
            disabled={!repository.isCurrentUserAdmin}
          >
            {formatMessage({
              id: "projects.repositories.setup",
            })}
          </Button>
        </Box>
      </Tooltip>
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
