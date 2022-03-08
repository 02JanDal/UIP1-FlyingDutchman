import { findOneOrFail, setMainView } from "./helpers.js";
import { setCurrentLocale } from "../controller/languages.js";

findOneOrFail("#button-is-customer").addEventListener("click", () =>
  setMainView("customer-home")
);

findOneOrFail("#button-is-bartender").addEventListener("click", () =>
  setMainView("bartender")
);

window.changeLanguage = function (changeTo) {
  setCurrentLocale(changeTo);
};
