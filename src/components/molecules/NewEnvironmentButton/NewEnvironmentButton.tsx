import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import AddIcon from "@mui/icons-material/Add";
import NewEnvironmentDialog from "components/organisms/NewEnvironmentDialog/NewEnvironmentDialog";
import { useCallback, useState } from "react";

export type NewEnvironmentButtonProps = PropsWithSx & {
  repositoryVcsId: number;
  configurationName: string;
  configurationId: string;
};

function NewEnvironmentButton({
  repositoryVcsId,
  configurationName,
  configurationId,
  sx,
}: NewEnvironmentButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ ...sx }}>
        {formatMessage({ id: "new-environment.button-label" })}
      </Button>
      <NewEnvironmentDialog
        repositoryVcsId={repositoryVcsId}
        configurationName={configurationName}
        configurationId={configurationId}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default NewEnvironmentButton;