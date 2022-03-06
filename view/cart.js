import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail('#to-sign-out').addEventListener("click", () =>
    setMainView("customer-home")
);
