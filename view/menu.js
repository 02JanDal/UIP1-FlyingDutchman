import { findOneOrFail, setMainView } from "./helpers.js";
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
 */
function displayProducts(products) {
  const menu = document.getElementById("insertMenu");
  for (const product of products) {
    const name = product.namn;
    const price = product.prisinklmoms;
    const producer = product.producent;
    const country = product.ursprunglandnamn;
    const type = product.varugrupp;
    const strength = product.alkoholhalt;
    const html = `
<div class="card" draggable="true" ondragstart="drag(event)" onclick="onClickProductPage('${name}', ${price}, '${producer}', '${country}', '${type}', ${strength})">
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

/***
 * Set the display of certain divs to none
 * @param {string} elementId
 */
function dontShow(elementId) {
  document.getElementById(elementId).style.display = "none";
}

/**
 * Set the display of certain divs to be shown on screen
 * @param {string} elementId
 * @param {string} style
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
  clearMenuList();
  replaceMenuTitle("All items");
  displayProducts(menuController.products);
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
  clearMenuList();
  replaceMenuTitle("Beers");
  menuController.setFilterCategory("beer");
  displayProducts(menuController.products);
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
  clearMenuList();
  replaceMenuTitle("Wine");
  menuController.setFilterCategory("wine");
  displayProducts(menuController.products);
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
  clearMenuList();
  replaceMenuTitle("Non Alcoholic");
  menuController.setFilterCategory("non-alcoholic");
  displayProducts(menuController.products);
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
  clearMenuList();
  menuController.setFilterAlcoholRange([0, 100]);
  displayProducts(menuController.products);
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
  clearMenuList();
  menuController.setFilterAlcoholRange([50, 100]);
  displayProducts(menuController.products);
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
  clearMenuList();
  menuController.setFilterAlcoholRange([30, 50]);
  displayProducts(menuController.products);
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
  clearMenuList();
  menuController.setFilterAlcoholRange([10, 30]);
  displayProducts(menuController.products);
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
  clearMenuList();
  menuController.setFilterAlcoholRange([0, 10]);
  displayProducts(menuController.products);
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
  dontShow("cart-page");
  dontShow("place-order-footer");
  updateCartCount();
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
  const mainHTML = `<h1 class="product-title">${name}</h1>
      <h1>${price} SEK</h1>`;
  main.insertAdjacentHTML("beforeend", mainHTML);
  const info = document.getElementById("additional-info");
  removeChild(info);
  const infoHTML = `<li class="li-list">Producer: ${producer}</li>
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
  show("successful-payment", "block");
};

/**
 * Function to close the modal pop up
 */
window.onClickButtonClose = () => {
  dontShow("successful-payment");
  setMainView("customer-home");
};

/**
 * Function to close the modal pop up
 */
window.onClickOutsideClose = (ev) => {
  const modal = document.getElementById("successful-payment");
  if (ev.target === modal) {
    modal.style.display = "none";
  }
  setMainView("customer-home");
};

//endregion

findOneOrFail("#to-cart").addEventListener("click", () => setMainView("cart"));
