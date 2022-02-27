import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail("#button-is-customer").addEventListener("click", () =>
  setMainView("customer-home")
);
