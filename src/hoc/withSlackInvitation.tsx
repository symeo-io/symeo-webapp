import React, { useCallback, useEffect, useState } from "react";
import SlackInvitationDialog from "components/organisms/SlackInvitationDialog/SlackInvitationDialog";

const HAS_VISITED_LOCALSTORAGE_KEY = "HAS_VISITED";

export function withSlackInvitation(
  WrappedComponent: React.ComponentType
): React.FC {
  return function (props) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(
      !localStorage.getItem(HAS_VISITED_LOCALSTORAGE_KEY)
    );

    const handleCloseDialog = useCallback(() => setDialogOpen(false), []);

    useEffect(() => {
      localStorage.setItem(HAS_VISITED_LOCALSTORAGE_KEY, "true");
    }, []);

    return (
      <>
        <SlackInvitationDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
        />
        <WrappedComponent {...props} />
      </>
    );
  };
}
