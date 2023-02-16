import React, { useCallback } from "react";
import { Box, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";
import { PropsWithSx } from "types/PropsWithSx";
import { colors } from "theme/colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDelayFlag } from "hooks/useDelayFlag";

export type CopyToClipboardButtonProps = PropsWithSx & {
  contentToCopy: string | undefined;
};

function CopyToClipboardButton({
  contentToCopy,
  sx,
}: CopyToClipboardButtonProps) {
  const { formatMessage } = useIntl();
  const [copied, activateCopied] = useDelayFlag(3000);

  const copyCreateKeyToClipboard = useCallback(async () => {
    if (contentToCopy) {
      await navigator.clipboard.writeText(contentToCopy);
      activateCopied();
    }
  }, [activateCopied, contentToCopy]);

  return (
    <Box
      onClick={copyCreateKeyToClipboard}
      sx={{
        width: "26px",
        height: "26px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: colors.secondary.text,

        "&:hover": {
          color: colors.secondary.textHover,
        },

        ...sx,
      }}
    >
      <Tooltip
        placement="top"
        open={copied}
        title={
          <Box
            sx={{
              fontWeight: 400,
              color: colors.success.text,
            }}
          >
            {formatMessage({
              id: "environment-settings.api-keys.table.copied",
            })}
          </Box>
        }
      >
        <ContentCopyIcon sx={{ fontSize: "18px" }} />
      </Tooltip>
    </Box>
  );
}

export default CopyToClipboardButton;
