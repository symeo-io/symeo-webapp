import { isObject, isArray } from "lodash";
import { isContractProperty } from "services/contract/contract.utils";
import { YamlUtils } from "services/yaml/yaml.utils";

export const supportedContractPropertyOptions = [
  "type",
  "secret",
  "optional",
  "regex",
];

export const contractPropertyTypes = [
  "string",
  "integer",
  "float",
  "boolean",
] as const;

export function validateContractString(contractString: string) {
  try {
    const contract = YamlUtils.parse(contractString);
    return validateContractFormat(contract);
  } catch (e) {
    return [`Your yaml is invalid: ${(e as any).message}`];
  }
}

export function validateContractFormat(contract: any, path?: string): string[] {
  let errors: string[] = [];

  const keys = Object.keys(contract);

  if (keys.length === 0) {
    if (path) {
      errors.push(`Property ${path} shouldn't be empty`);
    } else {
      errors.push(`Contract shouldn't be empty`);
    }

    return errors;
  }

  for (const key of keys) {
    const property = contract[key];
    const subPath = path ? `${path}.${key}` : key;

    if (!property) {
      errors.push(`Property ${subPath} shouldn't be empty`);
      continue;
    }

    if (isContractProperty(property)) {
      const options = Object.keys(property);

      for (const option of options) {
        if (!supportedContractPropertyOptions.includes(option)) {
          errors.push(`Unknown option ${option} in property ${subPath}`);
        }
      }

      if (!contractPropertyTypes.includes(property.type)) {
        errors.push(`Unknown type ${property.type} in property ${subPath}`);
      }

      if (
        property.secret !== null &&
        property.secret !== undefined &&
        typeof property.secret !== "boolean"
      ) {
        errors.push(`Option "secret" should be boolean in property ${subPath}`);
      }

      if (
        property.optional !== null &&
        property.optional !== undefined &&
        typeof property.optional !== "boolean"
      ) {
        errors.push(
          `Option "optional" should be boolean in property ${subPath}`
        );
      }

      if (property.regex !== null && property.regex !== undefined) {
        try {
          // eslint-disable-next-line no-new
          new RegExp(property.regex);
        } catch {
          errors.push(`Invalid regex provided in property ${subPath}`);
        }
      }
    } else {
      if (isArray(property) || !isObject(property)) {
        errors.push(`Property ${subPath} should be an object`);
        continue;
      }

      errors = [...errors, ...validateContractFormat(property, subPath)];
    }
  }

  return errors;
}
