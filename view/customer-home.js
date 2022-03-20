import { setMainView } from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

export {};

document.getElementById("continue-as-guest").addEventListener("click", () => {
  setMainView("menu");
  signInController.useGuest();
});
