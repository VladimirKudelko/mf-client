import { LanguageEnum } from '../shared/enums';
import { supportedLanguages } from '../shared/constants/supported-languages';

const defaultLanguage = LanguageEnum.English;

function getBrowserLanguage(): string {
  return (
    navigator['browserLanguage'] ||
    navigator['userLanguage'] ||
    navigator.languages[0] ||
    navigator.language
  );
}

export function getUserLanguage(): string {
  const userLang = getBrowserLanguage();
  const [language] = userLang.split('-');

  return supportedLanguages.includes(language.toLowerCase())
    ? language
    : defaultLanguage;
}
