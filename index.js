import { loadView, setMainView, setupLinks } from "./view/helpers.js";
import { updateUILocale } from "./controller/languages.js";

window.addEventListener("load", async () => {
  await Promise.all([
    loadView("home", "#home"),
    loadView("customer-home", "#customer-home"),
    loadView("customer-sign-in", "#customer-sign-in"),
    loadView("menu", "#menu"),
    loadView("product", "#product"),
    loadView("cart", "#cart"),
    loadView("split-bill", "#split-bill"),
    loadView("bartender", "#bartender"),
    loadView("bartender-sign-in", "#bartender-sign-in"),
  ]);
  updateUILocale();
  setupLinks(document.getElementsByTagName("body")[0]);
  setMainView("home");
});
