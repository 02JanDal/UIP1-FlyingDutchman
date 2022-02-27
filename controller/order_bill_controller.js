import undo, { UndoCommand } from "../util/undo_manager";

export default class OrderBillController {
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
          },
          () => {
            order.product_ids.splice(order.product_ids.indexOf(product.id));
            order.save();
          }
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
        }, undefined)
      );
    }
  }

    /***
     * To count the number of items in the cart
     * @param order
     */
  totalItem(order){
      const len = order.products.length
      console.log(len)
  }
}
