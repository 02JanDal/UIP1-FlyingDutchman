//const products = {
//get element by id from

//for products in

//element. create child
//}

import { beverages } from "../model/data/beverages.js";
import {findOneOrFail, setMainView} from "./helpers.js";

window.menuLanguage = function(){
    const menulang = document.getElementsByClassName('menu-language-li');
    const langimg = document.getElementsByClassName('img-language');
    menulang.addEventListener("click", () =>{
        if (langimg.src === "\"/images/sweden.png\""){
            return langimg.src = "/images/united-kingdom.png";
            setLanguage('en');
        } else {
            return langimg.src = "/images/sweden.png";
            setLanguage('sv');
        }
    });
}

function clickHandler(element) {
  //element.properties/id
  var parent = element.parentElement.parentElement
  for (let i = 0; i < parent.length; i++) {
    parent.children[i].children[0].classList.remove("selected")
  }

  if (!element.classList.contains("selected")) {
    element.classList.toggle("selected");
  }

}
window.clickHandler = clickHandler;

function submitHandler(element) {
  // for (let i = 0; i < element.children.length; i++) {
  //   element.children[i].classList.remove("selected")
  // }
  getElementById
}

function logoutHandler(element) {
  // for (let i = 0; i < element.children.length; i++) {
  //   element.children[i].classList.remove("selected")
  // }
}
window.logoutHandler = logoutHandler;

function allowDrop(ev) {
  ev.preventDefault();
}
window.allowDrop = allowDrop;

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
window.drag = drag;

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
window.drop = drop;

const menu = document.getElementById('insertMenuBartender');

for (var i = 0; i < beverages.length; i++){
  let name = beverages[i]['namn'];
  let price = beverages[i]['prisinklmoms'];
  let html = `
    <div class="bartender-card">
    <a href="#" id="to-product-page">
          <div class="card-container">
            <h4 class="item-title">${name}
            </h4>
            <p class="item-price">
              ${price} SEK
            </p>
          </div>      
          </a>
        </div>`;
  menu.insertAdjacentHTML('beforeend', html);
}

const table = document.getElementById('insertMenuBartender');

// for (var i = 0; i < beverages.length; i++){
//   let name = beverages[i]['namn'];
//   let price = beverages[i]['prisinklmoms'];
//   let html = `
//     <div class="bartender-card">
//     <a href="#" id="to-product-page">
//           <div class="card-container">
//             <h4 class="item-title">${name}
//             </h4>
//             <p class="item-price">
//               ${price} SEK
//             </p>
//           </div>      
//           </a>
//         </div>`;
//   menu.insertAdjacentHTML('beforeend', html);
// }

findOneOrFail('#to-product-page').addEventListener("click", () =>
    setMainView("product")
);

findOneOrFail("#to-cart").addEventListener("click", () =>
    setMainView("cart")
);

export {}; // needed so that we can import as a module
