import React from "react";
import { Box, DialogContent, Link, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import CreateConfigurationButton from "components/molecules/CreateConfigurationButton/CreateConfigurationButton";
import Code from "components/atoms/Code/Code";

export type CreateConfigurationHasAlreadyCreatedContractProps = PropsWithSx & {
  onHaveContractClick: () => void;
  onDontHaveContractClick: () => void;
};

function CreateConfigurationHasAlreadyCreatedContract({
  onHaveContractClick,
  onDontHaveContractClick,
  sx,
}: CreateConfigurationHasAlreadyCreatedContractProps) {
  const { formatMessage } = useIntl();

  return (
    <DialogContent
      sx={{
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CreateConfigurationButton
        onClick={onHaveContractClick}
        title={formatMessage({
          id: "create-configuration.has-created-contract.has-created-contract-button-title",
        })}
        message={
          <>
            {formatMessage({
              id: "create-configuration.has-created-contract.has-created-contract-button-message1",
            })}{" "}
            <Code>
              {formatMessage({
                id: "create-configuration.has-created-contract.has-created-contract-button-message2",
              })}
            </Code>{" "}
            {formatMessage({
              id: "create-configuration.has-created-contract.has-created-contract-button-message3",
            })}
          </>
        }
      />
      <CreateConfigurationButton
        onClick={onDontHaveContractClick}
        title={formatMessage({
          id: "create-configuration.has-created-contract.has-not-created-contract-button-title",
        })}
        message={
          <>
            {formatMessage({
              id: "create-configuration.has-created-contract.has-not-created-contract-button-message",
            })}
          </>
        }
        sx={{ marginTop: (theme) => theme.spacing(3) }}
      />
      <Box sx={{ marginTop: (theme) => theme.spacing(5) }}>
        <Typography>
          {formatMessage({
            id: "create-configuration.has-created-contract.learn-more-message",
          })}{" "}
          <Link href="https://docs.symeo.io" target="_blank">
            {formatMessage({
              id: "create-configuration.has-created-contract.learn-more-link",
            })}
          </Link>
        </Typography>
      </Box>
    </DialogContent>
  );
}

export default CreateConfigurationHasAlreadyCreatedContract;
