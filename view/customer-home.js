import { setMainView } from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

/**
 * To set the current user to be "null" for guest
 */
document.getElementById("continue-as-guest").addEventListener("click", () => {
  setMainView("menu");
  signInController.useGuest();
});

export {};
