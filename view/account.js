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
    const personal = document.getElementById("acc-info");
    const html = `<p>Username: ${info.username}</p>
    <p>Email: ${info.email}</p>`;
    personal.insertAdjacentHTML("beforeend", html);
}

addPersonalInformation();

function credits() {
    const credit = signInController.currentUser.account.creditSEK;
    const creditContainer = document.getElementById("credits");
    const html = `<h2>${credit} SEK</h2>`;
    creditContainer.insertAdjacentHTML("beforeend", html);
    document.getElementById('current-balance').innerHTML = '<span data-i18n="current-balance"></span>: ' + credit + ' SEK';
}

credits();

// NOT WORKING YET
// Need to figure out how to set new value on creditSEK
function updateCredits() {
    // const currentBalance = document.getElementById("top-up-value").value;
    // const credit = signInController.currentUser.account.creditSEK;
    // console.log(credit);
    // signInController.currentUser.account.creditSEK(parseInt(currentBalance));
    // const newResult = signInController.currentUser.account.creditSEK;
    // credits();
}