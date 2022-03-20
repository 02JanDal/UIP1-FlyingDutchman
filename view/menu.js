import { dontShow, setMainView, show } from "./helpers.js";
import menuController from "../controller/menu_controller.js";
import Product from "../model/product.js";
import orderBillController from "../controller/order_bill_controller.js";

//region Drag and drop to cart

/***
 * Function to add a class for drag and drop
 */
function addDnDClass() {
  const element = document.getElementById("cart-title");
  element.classList.add("cart-dnd");
}

/***
 * Function to remove a class for drag and drop
 */
function removeDnDClass() {
  const element = document.getElementById("cart-title");
  element.classList.remove("cart-dnd");
}

function updateCartCount() {
  document.getElementById("cart-title").innerHTML =
    "Cart (" +
    orderBillController.totalItem(orderBillController.getOrCreateOrder()) +
    ")";
}
orderBillController.addEventListener("OrderBillChanged", () => {
  updateCartCount();
});
updateCartCount();

/***
 * AllowDrop function
 */
window.allowDrop = (ev) => {
  ev.preventDefault();
};

/***
 * Drag function
 * @param {DragEvent} ev
 */
window.drag = (ev) => {
  let target = ev.target;
  // if the target itself does not have the product id we need to find the child that has it
  if (!target.hasAttribute("data-product-id")) {
    target = target.querySelector("[data-product-id]");
  }
  const productId = target.getAttribute("data-product-id");
  ev.dataTransfer.setData("item", productId);
};

/***
 * Drop function
 * @param {DragEvent} ev
 */
window.drop = (ev) => {
  const productId = ev.dataTransfer.getData("item");
  if (!productId) {
    return;
  }
  const product = Product.get(parseInt(productId));
  const order = orderBillController.getOrCreateOrder();
  orderBillController.addProduct(order, product);
  ev.preventDefault();
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
    if (event.target.id === "cart-title") {
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
    if (event.target.id === "cart-title") {
      addDnDClass();
    }
  },
  false
);

//endregion

//region Menu search and products list

/***
 * Show all passed products
 * @param {Product[]} products
 * @param {string} id - ID of menu element
 */
function displayProducts(products, id) {
  const menu = document.getElementById(id);
  for (const product of products) {
    const name = product.namn;
    const price = product.prisinklmoms;
    const producer = product.producent;
    const country = product.ursprunglandnamn;
    const type = product.varugrupp;
    const strength = product.alkoholhalt;
    const html = `
<div class="card" draggable="true" ondragstart="drag(event)" onclick="onClickProductPage('${name}', ${price}, '${producer}', '${country}', '${type}', ${strength}, ${product.id})">
  <a href="#" id="to-product-page" data-product-id="${product.id}">
    <div class="card-container">
      <h4 class="item-title">${name}</h4>
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
function clearMenuList() {
  const menu = document.getElementById("insertMenu");
  const children = menu.children;
  while (children.item(2)) {
    children.item(2).remove();
  }
}

/**
 * Show all items
 */
export function showAll() {
  clearMenuList();
  replaceMenuTitle("All items");
  menuController.setFilterCategory(undefined);
  displayProducts(menuController.products, "insertMenu");
}

window.onClickAllMenu = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  showAll();
  setMainView("menu"); // in case this method gets called from another view
};

/**
 * Show beers only
 */
export function showBeer() {
  clearMenuList();
  replaceMenuTitle("Beers");
  menuController.setFilterCategory("beer");
  displayProducts(menuController.products, "insertMenu");
}

window.onClickBeer = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  showBeer();
  setMainView("menu"); // in case this method gets called from another view
};

/**
 * Show wine only
 */
export function showWine() {
  clearMenuList();
  replaceMenuTitle("Wine");
  menuController.setFilterCategory("wine");
  displayProducts(menuController.products, "insertMenu");
}

window.onClickWine = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  showWine();
  setMainView("menu"); // in case this method gets called from another view
};

/**
 * Show non-alcoholic drinks only
 */
export function showNonAlcohol() {
  clearMenuList();
  replaceMenuTitle("Non Alcoholic");
  menuController.setFilterCategory("non-alcoholic");
  displayProducts(menuController.products, "insertMenu");
}

window.onClickNonAlcohol = () => {
  show("insertMenu", "inline-grid");
  dontShow("menu-home");
  dontShow("product-page");
  show("cart-footer", "block");
  dontShow("add-to-cart-footer");
  showNonAlcohol();
  setMainView("menu"); // in case this method gets called from another view
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
  clearMenuList();
  menuController.setFilterAlcoholRange([0, 100]);
  displayProducts(menuController.products, "insertMenu");
  setMainView("menu"); // in case this method gets called from another view
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
  clearMenuList();
  menuController.setFilterAlcoholRange([50, 100]);
  displayProducts(menuController.products, "insertMenu");
  setMainView("menu"); // in case this method gets called from another view
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
  clearMenuList();
  menuController.setFilterAlcoholRange([30, 50]);
  displayProducts(menuController.products, "insertMenu");
  setMainView("menu"); // in case this method gets called from another view
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
  clearMenuList();
  menuController.setFilterAlcoholRange([10, 30]);
  displayProducts(menuController.products, "insertMenu");
  setMainView("menu"); // in case this method gets called from another view
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
  clearMenuList();
  menuController.setFilterAlcoholRange([0, 10]);
  displayProducts(menuController.products, "insertMenu");
  setMainView("menu"); // in case this method gets called from another view
};

/**
 * Change alcohol content filter
 */
window.changeFilter = () => {
  const filter = document.getElementById("filter");
  if (filter.selectedIndex === 1) {
    onClickContent3050();
  } else if (filter.selectedIndex === 2) {
    onClickContent1030();
  } else if (filter.selectedIndex === 3) {
    onClickContent10();
  } else if (filter.selectedIndex === 0) {
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
  updateCartCount();
};

/**
 * Remove all first child
 * @param {HTMLElement} id Document ID
 */
export function removeChild(id) {
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
  strength,
  productID
) => {
  show("product-page", "block");
  dontShow("menu-home");
  dontShow("insertMenu");
  dontShow("cart-footer");
  show("add-to-cart-footer", "block");
  const main = document.getElementById("main-info");
  removeChild(main);
  const mainHTML = `<h1 class="product-title" data-product-id="${productID}">${name}</h1>
      <h1>${price} SEK</h1>`;
  main.insertAdjacentHTML("beforeend", mainHTML);
  const info = document.getElementById("additional-info");
  removeChild(info);
  const infoHTML = `<li class="li-list"><span data-i18n="producer"></span> ${producer}</li>
        <li class="li-list"><span data-i18n="country"></span> ${country}</li>
        <li class="li-list"><span data-i18n="type"></span> ${type}</li>
        <li class="li-list"><span data-i18n="strength"></span> ${strength}</li>`;
  info.insertAdjacentHTML("beforeend", infoHTML);
};

/**
 * Adding items directly from the product page
 */
window.addItem = () => {
  const target = document.getElementsByClassName("product-title")[0];
  const productID = target.getAttribute("data-product-id");
  const product = Product.get(parseInt(productID));
  const order = orderBillController.getOrCreateOrder();
  const totalItem = document.getElementById("number-product").value;
  for (let i = 0; i < totalItem; i++) {
    orderBillController.addProduct(order, product);
  }
  onClickBackToMenu();
};

//endregion

export { show, dontShow };
