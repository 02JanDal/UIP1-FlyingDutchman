import { findOneOrFail, setMainView } from "./helpers.js";

window.increaseValue = (id) => {
    var value = parseInt(document.getElementById(id).value, 10);
    value = isNaN(value) ? 0 : value;
    if (value < 5){
        value++;
    }
    document.getElementById(id).value = value;
}

window.decreaseValue = (id) => {
    var value = parseInt(document.getElementById(id).value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById(id).value = value;
}

findOneOrFail("#to-cart").addEventListener("click", () =>
    setMainView("cart")
);