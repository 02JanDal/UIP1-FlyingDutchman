import { findOneOrFail, setMainView } from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

findOneOrFail("#bartender-sign-in-button").addEventListener("click", () => {
  const elUsername = document.getElementById("bartender-uname");
  const elPassword = document.getElementById("bartender-password");
  if (signInController.trySignIn(elUsername.value, elPassword.value)) {
    setMainView("bartender");
    elUsername.value = "";
    elPassword.value = "";
  } else {
    document
      .getElementById("bartender-signin-error")
      .classList.remove("display-none");
  }
});
