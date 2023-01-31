import React, { PropsWithChildren, useCallback } from "react";

export const LocalStorageContext = React.createContext<{
  values: Record<string, string | undefined>;
  setValue: (key: string, value: string | undefined) => void;
}>({
  values: {},
  setValue: () => {},
});

export const LocalStorageContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [values, setStateValues] = React.useState<
    Record<string, string | undefined>
  >({ ...localStorage });

  const setValue = useCallback((key: string, value: string | undefined) => {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }

    setStateValues((previousValues) => ({ ...previousValues, [key]: value }));
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        values,
        setValue,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
