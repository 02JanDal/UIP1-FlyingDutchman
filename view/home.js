import { setCurrentLocale } from "../controller/languages.js";

window.changeLanguage = function (changeTo) {
  setCurrentLocale(changeTo);
};
