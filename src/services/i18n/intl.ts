type NestedMessage = {
  [x: string]: string | NestedMessage;
};

export const flattenMessages = (nestedMessages: NestedMessage, prefix = "") =>
  Object.keys(nestedMessages).reduce(
    (messages: Record<string, string>, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {}
  );

export default flattenMessages;
