import { PropsWithSx } from "types/PropsWithSx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useIntl } from "react-intl";
import Button from "components/atoms/Button/Button";
import React, { useCallback } from "react";
import { Organization } from "redux/api/organizations/organizations.types";
import { useAddLicenceKeyForm } from "components/organisms/AddOrganizationLicenceKeyDialog/useAddLicenceKeyForm";
import TextField from "components/molecules/TextField/TextField";
import { useAddLicenceKeyToOrganizationMutation } from "redux/api/organizations/organizations.api";

export type AddOrganizationLicenceKeyDialogProps = PropsWithSx & {
  organization: Organization;
  open: boolean;
  handleClose: () => void;
};

function AddOrganizationLicenceKeyDialog({
  organization,
  open,
  handleClose,
  sx,
}: AddOrganizationLicenceKeyDialogProps) {
  const { formatMessage } = useIntl();
  const { values, setValues, errors, validate } = useAddLicenceKeyForm({
    key: "",
  });

  const [addLicenceKeyToOrganization, { isLoading }] =
    useAddLicenceKeyToOrganizationMutation();

  const handleAddLicenceKeyToOrganization = useCallback(async () => {
    const hasErrors = validate();

    if (hasErrors) {
      return;
    }

    await addLicenceKeyToOrganization({
      organizationId: organization.vcsId,
      licenceKey: values.key,
    });
  }, [addLicenceKeyToOrganization, organization.vcsId, validate, values.key]);

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {formatMessage(
          {
            id: "organization-settings.plan.add-licence-key.title",
          },
          { organizationName: organization.name }
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          overflow: "auto",
        }}
      >
        <TextField
          name="key"
          value={values.key}
          onChange={(event) =>
            setValues({ ...values, key: event.target.value })
          }
          fullWidth
          required
          label={formatMessage({
            id: "organization-settings.plan.add-licence-key.key-field-label",
          })}
          placeholder={formatMessage({
            id: "organization-settings.plan.add-licence-key.key-field-placeholder",
          })}
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          error={errors.key.length > 0}
          helperText={
            errors.key.length > 0
              ? errors.key
                  .map((error) => formatMessage({ id: error }))
                  .join(", ")
              : undefined
          }
        />
      </DialogContent>
      <DialogActions sx={{ padding: (theme) => theme.spacing(3) }}>
        <Button variant="outlined" onClick={handleClose}>
          {formatMessage({
            id: "organization-settings.plan.add-licence-key.cancel-button-label",
          })}
        </Button>
        <Button loading={isLoading} onClick={handleAddLicenceKeyToOrganization}>
          {formatMessage({
            id: "organization-settings.plan.add-licence-key.confirm-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddOrganizationLicenceKeyDialog;
