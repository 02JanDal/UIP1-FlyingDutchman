import {dontShow, setMainView, show} from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

window.closeTopUp = () => {
    dontShow("top-up");
    setMainView("account");
}

window.openTopUp = () => {
    show("top-up", "block");
}

//Should update the view on how much money they have as well
window.topUpAccount = () => {
    dontShow("top-up");
    setMainView("account");
    // call update function that updates the total account balance SEK view
    updateCredits();
}

function addPersonalInformation() {
    const info = signInController.currentUser;
    if (info == null) {
        return
    }
    const personal = document.getElementById("acc-info");
    const html = `<p>Username: ${info.username}</p>
    <p>Email: ${info.email}</p>`;
    personal.insertAdjacentHTML("beforeend", html);
}

addPersonalInformation();

function credits() {
    const info = signInController.currentUser;
    if (info == null){
        return
    }
    const account = info.account;
    const credits = account.creditSEK;
    const creditContainer = document.getElementById("credits");
    const html = `<h2>${credits} SEK</h2>`;
    creditContainer.insertAdjacentHTML("beforeend", html);
    document.getElementById('current-balance').innerHTML = '<span data-i18n="current-balance"></span>: ' + credits + ' SEK';
}

credits();


function updateCredits() {
    const currentBalance = document.getElementById("top-up-value").value;
    const info = signInController.currentUser
    if (info == null){
        return
    }
    const account = info.account;
    account.creditSEK = parseInt(account.creditSEK) + parseInt(currentBalance);
    account.save();
    const creditContainer = document.getElementById("credits");
    const children = creditContainer.children;
    while (children.item(1)){
        children.item(1).remove();
    }
    const html = `<h2>${account.creditSEK} SEK</h2>`;
    creditContainer.insertAdjacentHTML("beforeend", html);
    document.getElementById('current-balance').innerHTML = '<span data-i18n="current-balance"></span>: ' + account.creditSEK + ' SEK';
}
