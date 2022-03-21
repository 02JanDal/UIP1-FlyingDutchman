import { dontShow, removeChild, show } from "./menu.js";
import orderBillController from "../controller/order_bill_controller.js";
import splitBillController from "../controller/split_bill_controller.js";
import Product from "../model/product.js";
import OrderBill from "../model/order_bill.js";
import { setMainView } from "./helpers.js";

/**
 * Connect to first page of split bill
 * (The page where it asks "how many people are splitting the bill?")
 */
window.toSplitBillPage1 = () => {
  dontShow("footer-split-bill-2");
  dontShow("split-bill-2");
  show("split-bill-1", "block");
  show("footer-split-bill-1", "block");
};

/**
 * Displaying the products left to select
 */
function displayProductsLeft() {
  const menuList = document.getElementById("split-bill-products-left");
  removeChild(menuList);
  for (const product of splitBillController.productsLeft) {
    const name = product.namn;
    const price = product.prisinklmoms;
    const html = `
    <div class="card" onclick="onClickSplitItem(${product.id})">
    <div class="card-container">
      <h4 class="item-title">${name}</h4>
      <p class="item-price">
        ${price}0 SEK
      </p>
    </div>      
    </div>`;
    menuList.insertAdjacentHTML("beforeend", html);
  }
}

/**
 * Displaying selected products
 *
 */
function displayProductsInBill() {
  const order = OrderBill.get(
    parseInt(document.getElementById("filter-splitbill").value)
  );
  const menuList = document.getElementById("split-bill-products");
  removeChild(menuList);
  for (const product of order.products) {
    const name = product.namn;
    const price = product.prisinklmoms;
    const html = `
    <div class="card" onclick="onClickUnsplitItem(${product.id})">
    <div class="card-container">
      <h4 class="item-title">${name}</h4>
      <p class="item-price">
        ${price}0 SEK
      </p>
    </div>      
    </div>`;
    menuList.insertAdjacentHTML("beforeend", html);
  }
}

/**
 * Connect to second page of split bill
 * (The page where it asks to select products for different people")
 */
window.toSplitBillPage2 = () => {
  dontShow("footer-split-bill-1");
  dontShow("split-bill-1");
  show("split-bill-2", "block");
  show("footer-split-bill-2", "block");

  const order = orderBillController.getOrCreateOrder();
  if (splitBillController.currentSplitBills.length > 0) {
    splitBillController.cancelSplitBill(order);
  }
  const totalSplitBills = document.getElementById("number-splitbill").value;
  splitBillController.splitBill(totalSplitBills, order);

  const parentPerson = document.getElementById("filter-splitbill");
  removeChild(parentPerson);
  for (let i = 0; i < totalSplitBills; i++) {
    const newPerson = `<option value="${splitBillController.currentSplitBills[i].id}">Person ${i}</option>`;
    parentPerson.insertAdjacentHTML("beforeend", newPerson);
  }

  displayProductsLeft();
  displayProductsInBill();
};

/**
 * Split items
 * @param id
 */
window.onClickSplitItem = (id) => {
  const product = Product.get(id);
  const target = OrderBill.get(
    parseInt(document.getElementById("filter-splitbill").value)
  );
  splitBillController.move(null, target, product);
  displayProductsLeft();
  displayProductsInBill();
};

/**
 * Unsplit items
 * @param id
 */
window.onClickUnsplitItem = (id) => {
  const product = Product.get(id);
  const source = OrderBill.get(
    parseInt(document.getElementById("filter-splitbill").value)
  );
  splitBillController.move(source, null, product);
  displayProductsLeft();
  displayProductsInBill();
};

/**
 * Place order and reset the bill
 */
window.onClickPaySplit = () => {
  const order = orderBillController.getOrCreateOrder();
  orderBillController.placeOrder(order);
  setMainView("menu");
};

/**
 * Dispaly products
 */
document.getElementById("filter-splitbill").addEventListener("change", (e) => {
  displayProductsInBill();
});
