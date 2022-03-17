import undo, { UndoCommand } from "../util/undo_manager.js";
import OrderBill from "../model/order_bill.js";

class OrderBillChangedEvent extends Event {
  /** @type OrderBill */
  #order;

  /** @return {OrderBill} */
  get order() {
    return this.#order;
  }

  /**
   * @param {OrderBill} order
   */
  constructor(order) {
    super("OrderBillChanged");
    this.#order = order;
  }
}

class OrderBillController extends EventTarget {
  getOrCreateOrder() {
    const id = localStorage.getItem("flyingdutchman_currentOrder");
    if (id) {
      return OrderBill.get(parseInt(id));
    } else {
      const order = new OrderBill();
      order.status = "pending";
      order.product_ids = [];
      order.save();
      localStorage.setItem("flyingdutchman_currentOrder", order.id);
      return order;
    }
  }

  /**
   * Adds a product to an order, only works if the order hasn't been placed yet
   *
   * @param {OrderBill} order
   * @param {Product} product
   */
  addProduct(order, product) {
    if (order.status === "pending")
      undo.push(
        new UndoCommand(
          () => {
            order.products = [...order.products, product];
            order.save();
            this.dispatchEvent(new OrderBillChangedEvent(order));
          },
          () => {
            order.product_ids.splice(order.product_ids.indexOf(product.id));
            order.save();
            this.dispatchEvent(new OrderBillChangedEvent(order));
          }
        )
      );
  }

  removeProduct(order, product){
    if (order.status === "pending")
      undo.push(
          new UndoCommand(
              () => {
                order.product_ids.splice(order.product_ids.indexOf(product.id), 1);
                order.save();
                this.dispatchEvent(new OrderBillChangedEvent(order));
              },undefined
          )
      );
  }

  /**
   * Changes the status of an order to "placed"
   *
   * @param {OrderBill} order
   */
  placeOrder(order) {
    if (order.status === "pending") {
      // cannot be undone
      undo.push(
        new UndoCommand(() => {
          order.status = "placed";
          order.save();
          this.dispatchEvent(new OrderBillChangedEvent(order));
        }, undefined)
      );
    }
  }

  /***
   * To count the number of items in the cart
   * @param order
   */
  totalItem(order) {
    return order.products.length;
  }
}

const orderBillController = new OrderBillController();
export default orderBillController;
