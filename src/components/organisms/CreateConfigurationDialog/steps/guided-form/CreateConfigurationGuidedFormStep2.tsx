import React from "react";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "components/atoms/Button/Button";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { CreateConfigurationFormValues } from "components/organisms/CreateConfigurationDialog/useCreateConfigurationForm";
import { UseFormErrors } from "hooks/useForm";

export type CreateConfigurationGuidedFormStep2Props = PropsWithSx & {
  values: CreateConfigurationFormValues;
  setValues: React.Dispatch<
    React.SetStateAction<CreateConfigurationFormValues>
  >;
  errors: UseFormErrors<CreateConfigurationFormValues>;
  onBack: () => void;
  onNext: () => void;
};

function CreateConfigurationGuidedFormStep2({
  onBack,
  onNext,
  values,
  setValues,
  errors,
  sx,
}: CreateConfigurationGuidedFormStep2Props) {
  const { formatMessage } = useIntl();

  return (
    <>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          overflow: "auto",
          ...sx,
        }}
      ></DialogContent>
      <DialogActions>
        <Button onClick={onBack} variant="outlined">
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.back-button-label",
          })}
        </Button>
        <Button onClick={onNext}>
          {formatMessage({
            id: "create-configuration.create-configuration-guided-form.next-button-label",
          })}
        </Button>
      </DialogActions>
    </>
  );
}

export default CreateConfigurationGuidedFormStep2;
