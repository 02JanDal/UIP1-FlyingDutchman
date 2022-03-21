import { setCurrentLocale } from "../controller/languages.js";

/**
 * Change language function from Swedish to English or English to Swedish
 * @param changeTo
 */
window.changeLanguage = function (changeTo) {
  setCurrentLocale(changeTo);
};
