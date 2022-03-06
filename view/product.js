import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail('#back-to-menu').addEventListener("click", () =>
    setMainView("menu")
);

window.increaseValue = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

window.decreaseValue = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}

findOneOrFail("#to-cart").addEventListener("click", () =>
    setMainView("cart")
);