export function getObjectValueByPath(object: any, path: string): unknown {
  const propertyNames = path.split(".");

  let currentProperty = object;

  for (const propertyName of propertyNames) {
    if (!currentProperty[propertyName]) {
      return undefined;
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
  const newObject = { ...object };
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
