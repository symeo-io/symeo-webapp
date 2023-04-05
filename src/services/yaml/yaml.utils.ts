import _ from "lodash";
import YAML from "yamljs";

export class YamlUtils {
  public static parse(yamlString: string): object {
    return this.removeNullValues(YAML.parse(yamlString)) as object;
  }

  private static removeNullValues(value: object) {
    const cb = (v: object): object | undefined => this.removeNullValues(v);
    if (_.isObject(value)) {
      return _(value).mapValues(cb).value();
    }

    if (!value) {
      return undefined;
    }

    return value;
  }
}
