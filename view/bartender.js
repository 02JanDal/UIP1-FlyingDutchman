import { beverages } from "../model/data/beverages.js";
import { table } from "../model/data/baseData.js";
import { findOneOrFail, setMainView } from "./helpers.js";
import menuController from "../controller/menu_controller.js";
import securityController from "../controller/security_controller.js";

/***
 * getProducts to get all the products list
 * The menu item for now is set to 500 for easier loading of the products list
 * @param beveragesList
 */
function getProducts(beveragesList) {
  const menu = document.getElementById("insertMenuBt");
  for (var i = 0; i < 500; i++) {
    let name = beveragesList[i]["namn"];
    let price = beveragesList[i]["prisinklmoms"];
    let producer = beveragesList[i]["producent"];
    let country = beveragesList[i]["ursprunglandnamn"];
    let type = beveragesList[i]["varugrupp"];
    let strength = beveragesList[i]["alkoholhalt"];
    let html = `<div class="card" draggable="true" ondragstart="drag(event)" onclick="onClickProductPage('${name}', ${price}, '${producer}', '${country}', '${type}', ${strength})">
        <a href="#" id="to-product-page">
          <div class="card-container">
            <h4 class="item-title">${name}
            </h4>
            <p class="item-price">
              ${price}0 SEK
            </p>
          </div>      
          </a>
        </div>`;
    menu.insertAdjacentHTML("beforeend", html);
  }
}

function getTables() {
  const menu = document.getElementById("insertMenuBt");
  for (var i = 0; i < table.length; i++) {
    let table_id = table[i]["table_id"];
    let status = table[i]["status"];
    let html = `
          <div class="bartender-card">
          <a href="#" id="to-product-page">
                <div class="card-container">
                  <h4 class="item-title">${table_id}
                  </h4>
                  <p class="item-price">
                    ${status}
                  </p>
                </div>      
                </a>
              </div>`;
    menu.insertAdjacentHTML("beforeend", html);
  }
}

function getSecurity() {
  const menu = document.getElementById("insertMenuBt");
    let html = `
          <div class="bartender-security">
            <div id="urgent">
              <p><strong>Urgent matters</strong></p>
              <button id="security-button" onclick="onClickCallSecurity()">Call security</button>
            </div>
            <div id="security">
            <p><strong>Non-urgent matters</strong></p>
            <p id="reporttxt">Report the situation</p>
              <textarea id="non-urgent" onclick="on<ClickReport>(document.getElementById('non-urgent').value) placeholder="Write here..."></textarea>
              <button id="report" onclick="onClickReport()">Report</button>
          </div>`;
    menu.insertAdjacentHTML("beforeend", html);
}

window.onClickCallSecurity = () => {
  securityController.callSecurity()
  console.log("Test")
};

window.onClickReport = (message) => {
  securityController.sendReport(message)
};

/***
 * Function to replace the title of the menu selection
 * @param title
 */
function replaceMenuTitle(title) {
  document.getElementById("menu-title-bt").innerHTML = title;
}

/***
 * Removing all the previous menu list in the same page
 */
function replaceMenuList() {
  const menu = document.getElementById("insertMenuBt");
  const children = menu.children;
  while (children.item(2)) {
    children.item(2).remove();
  }
}

/***
 * Set the display of certain divs to none
 * @param elementId
 */
function dontShow(elementId) {
  document.getElementById(elementId).style.display = "none";
}

/**
 * Set the display of certain divs to be shown on screen
 * @param elementId
 * @param style
 */
function show(elementId, style) {
  document.getElementById(elementId).style.display = style;
}

/**
 * Show all items
 */
window.onClickManage = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  replaceMenuTitle("Manage Stock");
  getProducts(beverages);
};

/**
 * Show beers only
 */
window.onClickTables = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  replaceMenuTitle("Tables");
  getTables();
};

/**
 * Show wine only
 */
window.onClickSecurity = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  replaceMenuTitle("Notify security");
  getSecurity()
};

/**
 * Show beverages (within selected menu section) with alcohol content 0-100%
 */
window.onClickContentAll = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  menuController.setFilterAlcoholRange([0, 100]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content > 50%
 */
window.onClickContent50 = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  menuController.setFilterAlcoholRange([50, 100]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content 30-50%
 */
window.onClickContent3050 = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  menuController.setFilterAlcoholRange([30, 50]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content 10-30%
 */
window.onClickContent1030 = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  menuController.setFilterAlcoholRange([10, 30]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content <10%
 */
window.onClickContent10 = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
  replaceMenuList();
  menuController.setFilterAlcoholRange([0, 10]);
  getProducts(menuController.products);
};

/**
 * Change alcohol content filter
 */
window.changeFilter = () => {
  var filter = document.getElementById("filter");
  if (filter.selectedIndex == 1) {
    onClickContent3050();
  } else if (filter.selectedIndex == 2) {
    onClickContent1030();
  } else if (filter.selectedIndex == 3) {
    onClickContent10();
  } else if (filter.selectedIndex == 0) {
    onClickContentAll();
  }
};

/**
 * Backwards button in menu page to go back to menu
 */
window.onClickBackToMenu = () => {
  show("insertMenuBt", "inline-grid");
  dontShow("menu-home-bt");
  dontShow("product-page-bt");
};

/**
 * Remove all first child
 * @param id Document ID
 */
function removeChild(id) {
  while (id.firstChild) {
    id.firstChild.remove();
  }
}

/**
 * To Product Page -- currently very messy
 */
window.onClickProductPage = (
  name,
  price,
  producer,
  country,
  type,
  strength
) => {
  show("product-page", "block");
  dontShow("menu-home");
  dontShow("insertMenu");
  dontShow("cart-footer");
  show("add-to-cart-footer", "block");
  dontShow("cart-page");
  dontShow("place-order-footer");
  const main = document.getElementById("main-info");
  removeChild(main);
  let mainHTML = `<h1 class="product-title">${name}</h1>
      <h1>${price} SEK</h1>`;
  main.insertAdjacentHTML("beforeend", mainHTML);
  const info = document.getElementById("additional-info");
  removeChild(info);
  let infoHTML = `<li class="li-list">Producer: ${producer}</li>
        <li class="li-list">Country: ${country}</li>
        <li class="li-list">Type: ${type}</li>
        <li class="li-list">Strength: ${strength}</li>`;
  info.insertAdjacentHTML("beforeend", infoHTML);
};

/**
 * To Cart
 */
window.onClickCart = () => {
  dontShow("product-page");
  dontShow("menu-home");
  dontShow("insertMenu");
  dontShow("cart-footer");
  dontShow("add-to-cart-footer");
  show("cart-page", "block");
  show("place-order-footer", "block");
};

findOneOrFail("#to-cart").addEventListener("click", () => setMainView("cart"));

export {}; // needed so that we can import as a module
