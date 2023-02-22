import { ConfigurationProperty } from "redux/api/configurations/configurations.types";

export function getInputColorForProperty(property: ConfigurationProperty) {
  switch (property.type) {
    case "boolean":
      return "#f3c364";
    case "integer":
    case "float":
      return "#6470F3";
    case "string":
      return "#69D3A7";
  }
}

const INTEGER_REGEX = /^\d*$/;
const FLOAT_REGEX = /^\d+\.\d+$/;

export function shouldUpdateValue(
  property: ConfigurationProperty,
  value: string
): boolean {
  if (property.type === "integer") {
    return !!value.match(INTEGER_REGEX);
  }

  if (property.type === "float") {
    return !!value.match(INTEGER_REGEX) || !!value.match(FLOAT_REGEX);
  }

  return true;
}

export function parsePropertyValue(
  property: ConfigurationProperty,
  value: string
) {
  if (property.type === "integer") {
    return value ? parseInt(value) : undefined;
  }

  if (property.type === "float") {
    return value ? parseFloat(value) : undefined;
  }

  if (property.type === "boolean") {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return undefined;
    }
  }

  return value;
}
