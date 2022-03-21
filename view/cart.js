import orderBillController from "../controller/order_bill_controller.js";
import { removeChild } from "./menu.js";
import Product from "../model/product.js";
import { dontShow, setMainView, show } from "./helpers.js";
import signInController from "../controller/sign_in_controller.js";

/**
 * Function to display products to view
 */
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
  const order = orderBillController.getOrCreateOrder();
  orderBillController.placeOrder(order);
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
 * Function to use account balance for payment
 * -- need to debug!
 */
window.updateBalance = () => {
  if (signInController.currentUser == null){
    return
  }
  const products = orderBillController.getOrCreateOrder().products;
  let counter = 0;
  for (const product of products) {
    const price = product.prisinklmoms;
    counter = counter + price;
  }
  const account = orderBillController.getOrCreateOrder().account;
  const filter = document.getElementById("payment-filter");
  if (filter.selectedIndex === 0) {
    return
  } else if (filter.selectedIndex === 1) {
    if (counter > account){
      show("low-balance", "block");
    } else {
      return
    }
  }
};

/**
 * To increase number of products selected
 * on product page
 * @param id
 */
window.increaseValue = (id) => {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < 5) {
    value++;
  }
  document.getElementById(id).value = value;
};

/**
 * To decrease number of products selected
 * on product page
 * @param id
 */
window.decreaseValue = (id) => {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementById(id).value = value;
};
