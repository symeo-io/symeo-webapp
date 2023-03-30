import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import PointInTimeRecoveryRollbackDialog from "components/organisms/PointInTimeRecoveryRollbackDialog/PointInTimeRecoveryRollbackDialog";
import { Configuration } from "redux/api/configurations/configurations.types";
import { Environment } from "redux/api/environments/environments.types";
import { ValuesVersion } from "redux/api/point-in-time-recovery/point-in-time-recovery.types";

export type PointInTimeRecoveryRollbackButtonProps = PropsWithSx & {
  configuration: Configuration;
  environment: Environment;
  version: ValuesVersion;
};

function PointInTimeRecoveryRollbackButton({
  configuration,
  environment,
  version,
  sx,
}: PointInTimeRecoveryRollbackButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button onClick={handleOpenDialog} sx={{ ...sx }}>
        {formatMessage({
          id: "environment-point-in-time-recovery.rollback-button-label",
        })}
      </Button>
      {dialogOpen && (
        <PointInTimeRecoveryRollbackDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          configuration={configuration}
          environment={environment}
          version={version}
        />
      )}
    </>
  );
}

export default PointInTimeRecoveryRollbackButton;
