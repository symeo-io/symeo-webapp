import { useCallback, useMemo, useState } from "react";
import { cloneDeep } from "lodash";

export type UseFormInput<T extends object> = {
  defaultValues: T;
  onValidate: (values: T) => Record<keyof T, string[]>;
};

export type UseFormOutput<T extends object> = {
  values: T;
  errors: Record<keyof T, string[]>;
  setValues: (values: T) => void;
  setErrors: (errors: Record<keyof T, string[]>) => void;
  reset: () => void;
  validate: () => boolean;
};

export function useForm<T extends object>({
  defaultValues,
  onValidate,
}: UseFormInput<T>): UseFormOutput<T> {
  const [values, setValues] = useState<T>(cloneDeep(defaultValues));

  const [errors, setErrors] = useState<Record<keyof T, string[]>>(
    buildDefaultErrorObjectFrom(defaultValues)
  );

  const reset = useCallback(() => {
    setValues(cloneDeep(defaultValues));
    setErrors(buildDefaultErrorObjectFrom(defaultValues));
  }, [defaultValues]);

  const validate = useCallback(() => {
    const newErrors = onValidate(values);
    setErrors(newErrors);

    for (const key of Object.keys(newErrors)) {
      if (newErrors[key as keyof T].length > 0) {
        return true;
      }
    }

    return false;
  }, [onValidate, values]);

  return useMemo(
    () => ({
      values,
      errors,
      setValues,
      setErrors,
      reset,
      validate,
    }),
    [errors, reset, validate, values]
  );
}

function buildDefaultErrorObjectFrom<T extends object>(
  defaultValue: T
): Record<keyof T, string[]> {
  const result: Record<string, string[]> = {};
  for (const key of Object.keys(defaultValue)) {
    result[key] = [] as string[];
  }

  return result as Record<keyof T, string[]>;
}
