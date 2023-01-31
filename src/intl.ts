import flattenMessages from "./services/i18n/intl";
import enMessages from "translations/en.json";
import { createIntl, createIntlCache } from "react-intl";

export const language = "en";

export const locales = {
  [language]: flattenMessages(enMessages),
};

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: language,
    messages: locales[language],
  },
  cache
);
