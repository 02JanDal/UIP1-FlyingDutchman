import { findOneOrFail, setMainView } from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

findOneOrFail("#sign-in-button").addEventListener("click", () => {
  const elUsername = document.getElementById("uname");
  const elPassword = document.getElementById("password");
  if (signInController.trySignIn(elUsername.value, elPassword.value)) {
    setMainView("menu");
    elUsername.value = "";
    elPassword.value = "";
  } else {
    document.getElementById("signin-error").classList.remove("display-none");
  }
});
