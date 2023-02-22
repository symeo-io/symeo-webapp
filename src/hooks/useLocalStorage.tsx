import { useCallback, useContext, useMemo } from "react";
import { LocalStorageContext } from "providers/localStorage/LocalStorageContextProvider";

export const useLocalStorage = (
  key: string
): [string | undefined, (value: string | undefined) => void] => {
  const { values, setValue } = useContext(LocalStorageContext);

  const value = useMemo(() => values[key], [key, values]);
  const setValueForKey = useCallback(
    (value: string | undefined) => setValue(key, value),
    [key, setValue]
  );

  return [value, setValueForKey];
};
