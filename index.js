import { loadView, setMainView } from "./view/helpers.js";

window.addEventListener("load", async () => {
  await Promise.all([
    loadView("home", "#home"),
    loadView("customer-home", "#customer-home"),
    loadView("sign-in", "#sign-in"),
    loadView("menu", "#menu"),
  ]);
  setMainView("home");
});
