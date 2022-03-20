import {dontShow, setMainView, show} from "./helpers.js";

window.closeTopUp = () => {
    dontShow("top-up");
    setMainView("account");
}

window.openTopUp = () => {
    show("top-up", "block");
}