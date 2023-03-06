import {
  ConfigurationContract,
  ConfigurationProperty,
} from "redux/api/configurations/configurations.types";
import YAML from "yamljs";

export function isConfigProperty(
  el: ConfigurationContract | ConfigurationProperty
) {
  return el.type && typeof el.type === "string";
}

export function initializeConfig(
  contract: ConfigurationContract,
  values: any
): any {
  const initializedConfig: any = {};
  Object.keys(contract).forEach((propertyName) => {
    const contractProperty = contract[propertyName];
    const valuesProperty = values && values[propertyName];

    if (!isConfigProperty(contractProperty)) {
      initializedConfig[propertyName] = initializeConfig(
        contractProperty as ConfigurationContract,
        valuesProperty
      );
      return;
    }

    initializedConfig[propertyName] = valuesProperty ?? null;
  });

  return initializedConfig;
}

export function toYamlString(contract: ConfigurationContract, values: any) {
  const yaml = YAML.stringify(
    initializeConfig(contract, values),
    Number.MAX_SAFE_INTEGER,
    2
  );

  return yaml.replace(/: null$/gm, ":");
}
