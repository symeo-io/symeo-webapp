import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import Button from "components/atoms/Button/Button";
import slackLogo from "./slack-logo.svg";
import { config } from "config";

export type SlackInvitationDialogProps = PropsWithSx & {
  open: boolean;
  handleClose: () => void;
};

function SlackInvitationDialog({
  open,
  handleClose,
  sx,
}: SlackInvitationDialogProps) {
  const { formatMessage } = useIntl();

  return (
    <Dialog open={open} onClose={handleClose} sx={sx}>
      <DialogTitle
        sx={{
          fontSize: "32px",
          textAlign: "center",
        }}
      >
        {formatMessage({
          id: "slack-invitation.title",
        })}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(1),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link
            href={config.slack.inviteLink}
            target="_blank"
            sx={{
              padding: (theme) => theme.spacing(1),
              width: "100px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px",
            }}
          >
            <img src={slackLogo} alt="slack" />
          </Link>
          <Box
            sx={{ marginTop: (theme) => theme.spacing(2), textAlign: "center" }}
          >
            {formatMessage({
              id: "slack-invitation.message",
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          href={config.slack.inviteLink}
          sx={{ fontSize: "18px", padding: (theme) => theme.spacing(2) }}
          onClick={(e) => {
            e.preventDefault();
            window.open(config.slack.inviteLink, "_blank");
            handleClose();
          }}
        >
          {formatMessage({
            id: "slack-invitation.join-button-label",
          })}
        </Button>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{ marginTop: (theme) => theme.spacing(1) }}
        >
          {formatMessage({
            id: "slack-invitation.maybe-later-button-label",
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SlackInvitationDialog;
