import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail("#button-sign-in").addEventListener("click", () =>
  setMainView("sign-in")
);
findOneOrFail("#link-guest").addEventListener("click", () =>
  setMainView("menu")
);
