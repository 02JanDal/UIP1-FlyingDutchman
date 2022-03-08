import { beverages } from "../model/data/beverages.js";
import {findOneOrFail, setMainView} from "./helpers.js";
import menuController from "../controller/menu_controller.js";

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


/***
 * getProducts to get all the products list
 * The menu item for now is set to 500 for easier loading of the products list
 * @param beveragesList
 */
function getProducts(beveragesList){
    const menu = document.getElementById('insertMenu');
    for (var i = 0; i < 500; i++){
        let name = beveragesList[i]['namn'];
        let price = beveragesList[i]['prisinklmoms'];
        let html = `<div class="card" draggable="true" ondragstart="drag(event)">
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
}

/***
 * Function to replace the title of the menu selection
 * @param title
 */
function replaceMenuTitle(title){
    document.getElementById('menu-title').innerHTML = (title);
}

/***
 * Removing all the previous menu list in the same page
 */
function replaceMenuList(){
    const menu = document.getElementById('insertMenu');
    const children = menu.children;
    while (children.item(3)){
        children.item(3).remove()
    }
}

/***
 * Set the display of certain divs to none
 * @param elementId
 */
function dontShow(elementId){
    document.getElementById(elementId).style.display = "none";
}

/**
 * Set the display of certain divs to be shown on screen
 * @param elementId
 * @param style
 */
function show(elementId, style){
    document.getElementById(elementId).style.display = style;
}

/**
 * Show all items
 */
window.onClickAllMenu = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    replaceMenuTitle("All items");
    getProducts(beverages);
}

/**
 * Show beers only
 */
window.onClickBeer = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    replaceMenuTitle("Beers");
    menuController.setFilterCategory("beer");
    getProducts(menuController.products);
}

/**
 * Show wine only
 */
window.onClickWine = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    replaceMenuTitle("Wine");
    menuController.setFilterCategory("wine");
    getProducts(menuController.products);
}

/**
 * Show non-alcoholic drinks only
 */
window.onClickNonAlcohol= () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    replaceMenuTitle("Non Alcoholic");
    menuController.setFilterCategory("non-alcoholic");
    getProducts(menuController.products);
}

/**
 * Show beverages (within selected menu section) with alcohol content 0-100%
 */
window.onClickContentAll = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    menuController.setFilterAlcoholRange([0,100]);
    getProducts(menuController.products);
}

/**
 * Show beverages (within selected menu section) with alcohol content > 50%
 */
window.onClickContent50 = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    menuController.setFilterAlcoholRange([50,100]);
    getProducts(menuController.products);
}

/**
 * Show beverages (within selected menu section) with alcohol content 30-50%
 */
window.onClickContent3050 = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    menuController.setFilterAlcoholRange([30,50]);
    getProducts(menuController.products);
}

/**
 * Show beverages (within selected menu section) with alcohol content 10-30%
 */
window.onClickContent1030 = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    menuController.setFilterAlcoholRange([10,30]);
    getProducts(menuController.products);
}

/**
 * Show beverages (within selected menu section) with alcohol content <10%
 */
window.onClickContent10 = () => {
    show('insertMenu', "inline-grid");
    dontShow('menu-home');
    replaceMenuList();
    menuController.setFilterAlcoholRange([0,10]);
    getProducts(menuController.products);
}

/**
 * Change alcohol content filter
 */
window.changeFilter = () => {
    var filter = document.getElementById("filter");
    if (filter.selectedIndex == 1){
        onClickContent3050();
    } else if (filter.selectedIndex == 2){
        onClickContent1030();
    } else if (filter.selectedIndex == 3){
        onClickContent10();
    } else if (filter.selectedIndex == 0){
        onClickContentAll();
    }
}

// findOneOrFail('#to-product-page').addEventListener("click", () =>
//     setMainView("product")
// );

findOneOrFail("#to-cart").addEventListener("click", () =>
    setMainView("cart")
);

export {}; // needed so that we can import as a module
