import { findOneOrFail, setMainView } from "./helpers.js";

findOneOrFail("#button-is-customer").addEventListener("click", () =>
  setMainView("customer-home")
);

findOneOrFail("#button-is-bartender").addEventListener("click", () =>
  setMainView("bartender")
);

window.changeLanguage = function(){
    const swe = document.getElementById('swedish-button');
    const eng = document.getElementById('english-button');
    swe.addEventListener("click", () =>{
        swe.src = "/images/sweden-activated.png";
        eng.src = "/images/united-kingdom.png";
        setLanguage('sv');
    })
    eng.addEventListener("click", () =>{
        swe.src = "/images/sweden.png";
        eng.src = "/images/united-kingdom-activated.png";
        setLanguage('en');
    });
}