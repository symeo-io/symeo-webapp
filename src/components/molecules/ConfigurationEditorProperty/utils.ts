import { cloneDeep, get, set } from "lodash";

export function getObjectValueByPath(object: any, path: string): unknown {
  return get(object, path);
}

export function setObjectValueByPath(
  object: any,
  path: string,
  newValue: unknown
): any {
  const newObject = cloneDeep(object);
  set(newObject, path, newValue);

  return newObject;
}

export function isModifiedByPath(
  object: any,
  originalObject: any,
  path: string
): boolean {
  const modifiedValue = getObjectValueByPath(object, path);
  const originalValue = getObjectValueByPath(originalObject, path);

  return modifiedValue !== originalValue;
}

export function buildModifiedValuesObject(
  object: any,
  originalObject: any
): any {
  let result = {};
  const paths = getObjectPaths(object);

  for (const path of paths) {
    const value = getObjectValueByPath(object, path);
    const originalValue = getObjectValueByPath(originalObject, path);

    if (value !== originalValue) {
      result = setObjectValueByPath(result, path, value);
    }
  }

  return result;
}

export function getObjectPaths(object: any) {
  const paths: string[] = [];
  const walk = function (object: any, path?: string) {
    for (const n in object) {
      if (object[n]) {
        if (typeof object[n] === "object" || object[n] instanceof Array) {
          walk(object[n], path ? path + "." + n : n);
        } else {
          paths.push(path ? path + "." + n : n);
        }
      }
    }
  };
  walk(object);
  return paths;
}
