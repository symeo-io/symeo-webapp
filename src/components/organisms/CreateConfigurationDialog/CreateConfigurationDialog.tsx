import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { Repository } from "redux/api/repositories/repositories.types";
import CreateConfigurationHasAlreadyCreatedContract from "components/organisms/CreateConfigurationDialog/steps/CreateConfigurationHasAlreadyCreatedContract";
import CreateConfigurationFastForm from "components/organisms/CreateConfigurationDialog/steps/CreateConfigurationFastForm";
import CreateConfigurationGuidedForm from "components/organisms/CreateConfigurationDialog/steps/guided-form/CreateConfigurationGuidedForm";

export type CreateConfigurationDialogProps = PropsWithSx & {
  repository?: Repository;
  open: boolean;
  handleClose: () => void;
};

function CreateConfigurationDialog({
  repository,
  open,
  handleClose,
  sx,
}: CreateConfigurationDialogProps) {
  const { formatMessage } = useIntl();
  const [haveContract, setHaveContract] = useState<boolean | undefined>(
    undefined
  );

  const reset = useCallback(() => {
    setHaveContract(undefined);
  }, []);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", fontSize: "24px" }}
      >
        {formatMessage({
          id: "create-configuration.title",
        })}
      </DialogTitle>
      {haveContract === undefined && (
        <CreateConfigurationHasAlreadyCreatedContract
          onHaveContractClick={() => setHaveContract(true)}
          onDontHaveContractClick={() => setHaveContract(false)}
        />
      )}
      {haveContract === true && (
        <CreateConfigurationFastForm
          repository={repository}
          onCancel={() => setHaveContract(undefined)}
        />
      )}
      {haveContract === false && (
        <CreateConfigurationGuidedForm
          repository={repository}
          onCancel={() => setHaveContract(undefined)}
        />
      )}
    </Dialog>
  );
}

export default CreateConfigurationDialog;
