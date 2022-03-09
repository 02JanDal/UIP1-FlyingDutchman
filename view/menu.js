import { beverages } from "../model/data/beverages.js";
import { findOneOrFail, setMainView } from "./helpers.js";
import menuController from "../controller/menu_controller.js";
import undo, { UndoCommand } from "../util/undo_manager.js";

/***
 * Set the language in the menu
 * This should be moved to controller, I believe!
 */
window.menuLanguage = function () {
  const menulang = document.getElementsByClassName("menu-language-li");
  const langimg = document.getElementsByClassName("img-language");
  menulang.addEventListener("click", () => {
    if (langimg.src === '"/images/sweden.png"') {
      return (langimg.src = "/images/united-kingdom.png");
      setLanguage("en");
    } else {
      return (langimg.src = "/images/sweden.png");
      setLanguage("sv");
    }
  });
};

/**
 * Itemcount to test the number of items added
 * Will be removed when we're triggering creation of OrderBill instead!
 * @type {number}
 */
var itemCount = 0;

/***
 * Function to add a class for drag and drop
 */
function addDnDClass() {
  var element = document.getElementById("cart-title");
  element.classList.add("cart-dnd");
}

/***
 * Function to remove a class for drag and drop
 */
function removeDnDClass() {
  var element = document.getElementById("cart-title");
  element.classList.remove("cart-dnd");
}

/***
 * AllowDrop function
 */
window.allowDrop = (ev) => {
  ev.preventDefault();
};

/***
 * Drag function
 */
window.drag = (ev) => {
  ev.dataTransfer.setData("Item", ev.target.id);
};

/***
 * Drop function
 */
window.drop = (ev) => {
  undo.push(
    new UndoCommand(
      () => {
        itemCount++;
        document.getElementById("cart-title").innerHTML =
          "Cart (" + itemCount + ")";
      },
      () => {
        itemCount--;
        document.getElementById("cart-title").innerHTML =
          "Cart (" + itemCount + ")";
      }
    )
  );
  event.preventDefault();
  var data = event.dataTransfer.getData("Item");
};

/***
 * DnD effect -- dragstart
 */
document.addEventListener(
  "dragstart",
  function (event) {
    // make it half transparent
    event.target.style.opacity = 0.5;
    addDnDClass();
  },
  false
);

/***
 * DnD effect -- dragend
 */
document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "1";
    removeDnDClass();
  },
  false
);

/***
 * DnD effect -- dragenter
 */
document.addEventListener(
  "dragenter",
  function (event) {
    // make it half transparent
    if (event.target.id == "cart-title") {
      removeDnDClass();
    }
  },
  false
);

/***
 * DnD effect -- dragleave
 */
document.addEventListener(
  "dragleave",
  function (event) {
    // make it half transparent
    if (event.target.id == "cart-title") {
      addDnDClass();
    }
  },
  false
);

/***
 * getProducts to get all the products list
 * The menu item for now is set to 500 for easier loading of the products list
 * @param beveragesList
 */
function getProducts(beveragesList) {
  const menu = document.getElementById("insertMenu");
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

/***
 * Function to replace the title of the menu selection
 * @param title
 */
function replaceMenuTitle(title) {
  document.getElementById("menu-title").innerHTML = title;
}

/***
 * Removing all the previous menu list in the same page
 */
function replaceMenuList() {
  const menu = document.getElementById("insertMenu");
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
window.onClickAllMenu = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  replaceMenuTitle("All items");
  getProducts(beverages);
};

/**
 * Show beers only
 */
window.onClickBeer = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  replaceMenuTitle("Beers");
  menuController.setFilterCategory("beer");
  getProducts(menuController.products);
};

/**
 * Show wine only
 */
window.onClickWine = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  replaceMenuTitle("Wine");
  menuController.setFilterCategory("wine");
  getProducts(menuController.products);
};

/**
 * Show non-alcoholic drinks only
 */
window.onClickNonAlcohol = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  replaceMenuTitle("Non Alcoholic");
  menuController.setFilterCategory("non-alcoholic");
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content 0-100%
 */
window.onClickContentAll = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  menuController.setFilterAlcoholRange([0, 100]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content > 50%
 */
window.onClickContent50 = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  menuController.setFilterAlcoholRange([50, 100]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content 30-50%
 */
window.onClickContent3050 = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  menuController.setFilterAlcoholRange([30, 50]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content 10-30%
 */
window.onClickContent1030 = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  replaceMenuList();
  menuController.setFilterAlcoholRange([10, 30]);
  getProducts(menuController.products);
};

/**
 * Show beverages (within selected menu section) with alcohol content <10%
 */
window.onClickContent10 = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
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
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  dontShow("cart-page");
  dontShow("place-order-footer");
  document.getElementById("cart-title").innerHTML = "Cart (" + itemCount + ")";
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

/**
 * Function to trigger the modal pop up
 */
window.onClickPlaceOrder = () => {
  var modal = document.getElementById("successful-payment");
  modal.style.display = "block";
};

/**
 * Function to close the modal pop up
 */
window.onClickButtonClose = () => {
  var modal = document.getElementById("successful-payment");
  modal.style.display = "none";
  setMainView("customer-home");
};

/**
 * Function to close the modal pop up
 */
window.onClickOutsideClose = () => {
  var modal = document.getElementById("successful-payment");
  if (event.target == modal) {
    modal.style.display = "none";
  }
  setMainView("customer-home");
};

findOneOrFail("#to-cart").addEventListener("click", () => setMainView("cart"));

window.doUndo = () => undo.undo();
window.doRedo = () => undo.redo();

export {}; // needed so that we can import as a module
