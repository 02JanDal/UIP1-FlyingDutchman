import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail("#button-sign-in").addEventListener("click", () =>
  setMainView("sign-in")
);
findOneOrFail("#link-guest").addEventListener("click", () =>
  setMainView("menu")
);
findOneOrFail('#back-home').addEventListener("click", () =>
setMainView("home")
);
findOneOrFail('#back-customer-home').addEventListener("click", () =>
    setMainView("customer-home")
);

findOneOrFail("#login").addEventListener("click", () =>
    setMainView("menu")
);