import {dontShow, setMainView, show} from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

/**
 * Close top-up modal
 */
window.closeTopUp = () => {
    dontShow("top-up");
    setMainView("account");
}

/**
 * Open top-up modal
 */
window.openTopUp = () => {
    show("top-up", "block");
}

/**
 * When top up is successful
 */
window.topUpAccount = () => {
    dontShow("top-up");
    setMainView("account");
    updateCredits();
}

/**
 * Updating user info to view
 */
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

/**
 * Updating user credits to view
 */
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

/**
 * Updating user credits when user top up credits to view
 */
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
