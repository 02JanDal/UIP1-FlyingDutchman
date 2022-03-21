import {dontShow, findOneOrFail, setMainView, show} from "./helpers.js";
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

function showAccount() {
  if (signInController.currentUser == null){
    dontShow("vip-account");
    dontShow("vip-cart-account");
    dontShow("vip-splitbill-account");
    dontShow("payment-method");
  } else if (signInController.currentUser.isVIP){
    show("vip-account", "block");
    show("vip-cart-account", "block");
    show("vip-splitbill-account", "block");
    show("payment-method", "block");
  } else{
    dontShow("vip-account");
    dontShow("vip-cart-account");
    dontShow("vip-splitbill-account");
    dontShow("payment-method");
  }
}

signInController.addEventListener("UserChanged", showAccount);

export {showAccount};