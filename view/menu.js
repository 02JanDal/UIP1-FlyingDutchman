import { beverages } from "../model/data/beverages.js";
import {findOneOrFail, setMainView} from "./helpers.js";

/***
 * Set the language in the menu
 * This should be moved to controller, I believe!
 */
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

/**
 * Itemcount to test the number of items added
 * Will be removed when we're triggering creation of OrderBill instead!
 * @type {number}
 */
var itemCount = 0;

/***
 * Function to add a class for drag and drop
 */
function addDnDClass(){
    var element = document.getElementById("cart-title");
    element.classList.add("cart-dnd");
}

/***
 * Function to remove a class for drag and drop
 */
function removeDnDClass(){
    var element = document.getElementById("cart-title");
    element.classList.remove("cart-dnd");
}

/***
 * AllowDrop function
 */
window.allowDrop = (ev) => {
    ev.preventDefault();
}


/***
 * Drag function
 */
window.drag = (ev) => {
    ev.dataTransfer.setData("Item", ev.target.id);
}

/***
 * Drop function
 */
window.drop = (ev) => {
    itemCount = itemCount + 1;
    event.preventDefault();
    var data= event.dataTransfer.getData("Item");
    document.getElementById('cart-title').innerHTML = ("Cart ("+itemCount+")");
}

/***
 * DnD effect -- dragstart
 */
document.addEventListener("dragstart", function( event ) {
    // make it half transparent
    event.target.style.opacity = .5;
    addDnDClass();
}, false);

/***
 * DnD effect -- dragend
 */
document.addEventListener("dragend", function( event ) {
    // reset the transparency
    event.target.style.opacity = "1";
    removeDnDClass();
}, false);

/***
 * DnD effect -- dragenter
 */
document.addEventListener("dragenter", function( event ) {
    // make it half transparent
    if (event.target.id == "cart-title"){
        removeDnDClass();
    }
}, false);

/***
 * DnD effect -- dragleave
 */
document.addEventListener("dragleave", function( event ) {
    // make it half transparent
    if (event.target.id == "cart-title"){
        addDnDClass();
    }
}, false);

/**
 * Container to show the menu list
 * @type {HTMLElement}
 */
const menu = document.getElementById('insertMenu');

/***
 * Show all items in the menu (by default)
 * Havent been updated yet for selections of "All Items", "Beer", "Wine", etc
 */
for (var i = 0; i < beverages.length; i++){
  let name = beverages[i]['namn'];
  let price = beverages[i]['prisinklmoms'];
  let html = `
    <div class="card" draggable="true" ondragstart="drag(event)">
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

findOneOrFail('#to-product-page').addEventListener("click", () =>
    setMainView("product")
);

findOneOrFail("#to-cart").addEventListener("click", () =>
    setMainView("cart")
);

export {}; // needed so that we can import as a module
