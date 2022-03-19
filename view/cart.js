import orderBillController from "../controller/order_bill_controller.js";
import { removeChild } from "./menu.js";
import Product from "../model/product.js";
import { dontShow, setMainView, show } from "./helpers.js";
import splitBillController from "../controller/split_bill_controller.js";

const displayCart = () => {
  const products = orderBillController.getOrCreateOrder().products;
  const order = document.getElementById("order-list");
  const children = order.children;
  while (children.item(1)) {
    children.item(1).remove();
  }
  let counter = 0;
  for (const product of products) {
    const name = product.namn;
    const price = product.prisinklmoms;
    counter = counter + price;
    const orders = `<tr>
          <td class="order-product-title"><span class="remove" onclick="removeItem(${product.id})">&times;</span>${name}</td>
          <td class="order-product-price">${price} SEK</td>
        </tr>`;
    order.insertAdjacentHTML("beforeend", orders);
  }
  const totalBill = document.getElementById("total-bill");
  removeChild(totalBill);
  const bill = `<p class="total-counter">Total: ${counter} SEK</p>
                <div class="end-gap"></div>`;
  totalBill.insertAdjacentHTML("beforeend", bill);
};
orderBillController.addEventListener("OrderBillChanged", displayCart);
displayCart();

/**
 * Function view to remove item
 * @param productId
 */
window.removeItem = (productId) => {
  const product = Product.get(parseInt(productId));
  const order = orderBillController.getOrCreateOrder();
  orderBillController.removeProduct(order, product);
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
  dontShow("successful-payment");
  setMainView("customer-home");
};

/**
 * Function to add split bills
 */
window.onClickSplitBills = () => {
  dontShow("place-order-footer");
  dontShow("split-bill-choose");
  show("split-bill", "block");
  show("continue-footer", "block");
};

/**
 * Function to continue
 */
window.onClickContinue = () => {
  dontShow("place-order-footer");
  dontShow("split-bill");
  show("split-bill-choose", "block");
  dontShow("continue-footer");

  const splitBillList = document.getElementById("split-bill-list");
  removeChild(splitBillList);
  const totalSplitBills = document.getElementById("number-splitbill").value;
  const parentPerson = document.getElementById("filter-splitbill");
  removeChild(parentPerson);
  for (let i = 0; i < totalSplitBills; i++) {
    const newPerson = `<option value="person-${i}">Person ${i}</option>`;
    parentPerson.insertAdjacentHTML("beforeend", newPerson);
  }
  const products = orderBillController.getOrCreateOrder().products;
  const menuList = document.getElementById("split-bill-products");
  for (const product of products) {
    const name = product.namn;
    const price = product.prisinklmoms;
    const html = `
    <div class="card" onclick="itemSelected()">
    <a href="#" id="to-product-page" data-product-id="${product.id}">
    <div class="card-container">
      <h4 class="item-title">${name}</h4>
      <p class="item-price">
        ${price}0 SEK
      </p>
    </div>      
    </a>
    </div>`;
    menuList.insertAdjacentHTML("beforeend", html);
  }
  // Not working
  const order = orderBillController.getOrCreateOrder();
  splitBillController.splitBill(totalSplitBills, order);
  console.log(order);
};

/**
 * Select item for Split bills
 */
window.itemSelected = () => {};

/**
 * Backwards to split bill menu
 */
window.onClickBackToSplitBillHome = () => {
  show("split-bill", "block");
  dontShow("place-order-footer");
  show("continue-footer", "block");
  dontShow("split-bill-choose");
};
