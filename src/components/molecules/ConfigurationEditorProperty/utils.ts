import { cloneDeep } from "lodash";

export function getObjectValueByPath(object: any, path: string): unknown {
  const propertyNames = path.split(".");

  let currentProperty = object;

  for (const propertyName of propertyNames) {
    if (!currentProperty[propertyName]) {
      return currentProperty[propertyName];
    }

    currentProperty = currentProperty[propertyName];
  }

  return currentProperty;
}

export function setObjectValueByPath(
  object: any,
  path: string,
  newValue: unknown
): any {
  const newObject = cloneDeep(object);
  const propertyNames = path.split(".");

  let currentProperty = newObject;

  for (let i = 0; i < propertyNames.length; i++) {
    if (i !== propertyNames.length - 1) {
      if (!currentProperty[propertyNames[i]]) {
        currentProperty[propertyNames[i]] = {};
      }

      currentProperty = currentProperty[propertyNames[i]];
    } else {
      currentProperty[propertyNames[i]] = newValue;
    }
  }

  return newObject;
}

export function isModifiedByPath(
  object: any,
  originalObject: any,
  path: string
) {
  const modifiedValue = getObjectValueByPath(object, path);
  const originalValue = getObjectValueByPath(originalObject, path);

  return modifiedValue !== originalValue;
}
