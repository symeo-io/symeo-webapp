import React from "react";

export function useDelayFlag(duration: number): [boolean, () => void] {
  const [state, setState] = React.useState<boolean>(false);
  const activateFlag = React.useCallback(() => setState(true), [setState]);

  React.useEffect(() => {
    if (state) {
      setTimeout(() => setState(false), duration);
    }
  }, [state, setState, duration]);

  return [state, activateFlag];
}
