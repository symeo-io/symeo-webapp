import { PropsWithSx } from "types/PropsWithSx";
import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import AddOrganizationLicenceKeyDialog from "components/organisms/AddOrganizationLicenceKeyDialog/AddOrganizationLicenceKeyDialog";
import { Organization } from "redux/api/organizations/organizations.types";

export type AddOrganizationLicenceKeyButtonProps = PropsWithSx & {
  organization: Organization;
};

function AddOrganizationLicenceKeyButton({
  organization,
  sx,
}: AddOrganizationLicenceKeyButtonProps) {
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = useCallback(() => setDialogOpen(true), []);
  const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <Button onClick={handleOpenDialog} sx={{ ...sx }}>
        {formatMessage({
          id: "organization-settings.plan.add-licence-key-button",
        })}
      </Button>
      <AddOrganizationLicenceKeyDialog
        organization={organization}
        open={dialogOpen}
        handleClose={handleCloseDialog}
      />
    </>
  );
}

export default AddOrganizationLicenceKeyButton;
