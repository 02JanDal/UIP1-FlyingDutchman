import undo, { UndoCommand } from "../util/undo_manager.js";
import OrderBill from "../model/order_bill.js";
import orderBillController from "./order_bill_controller.js";
import Product from "../model/product.js";

class SplitBillController {
  /***
   * Creating the split bill
   *
   * @param {number} n -- number of people
   * @param {OrderBill} order
   */
  splitBill(n, order) {
    if (order.splitInto.length > 0) {
      throw Error("Order is already split");
    }
    if (order.splitFrom !== null) {
      throw Error("Attempting to split a split bill");
    }
    undo.push(
      new UndoCommand(() => {
        for (let i = 0; i < n; i++) {
          const bill = new OrderBill();
          bill.party = order.party;
          bill.splitFrom = order;
          bill.status = "pending";
          bill.products = [];
          bill.save();
          console.log(bill);
        }
      }, undefined)
    );
  }

  /***
   * Cancelling the split bills
   *
   * @param {OrderBill} order
   */
  cancelSplitBill(order) {
    if (order.splitInto.length === 0) {
      throw Error("Order is not split");
    }
    undo.push(
      new UndoCommand(() => {
        // removing split by deleting split bills
        for (const bill of order.splitInto) {
          bill.delete();
        }
      }, undefined)
    );
  }

  /**
   * Get the list of split bills we're working with right now

   * @return {OrderBill[]}
   */
  get currentSplitBills() {
    return orderBillController.getOrCreateOrder().splitInto;
  }

  /**
   * Return true if all products have been distributed into a bill
   *
   * @returns {boolean}
   */
  get isSplitComplete() {
    return this.productsLeft.length === 0;
  }

  /**
   * Get the list of products that still need to be distributed into a split bill
   *
   * @return {Product[]}
   */
  get productsLeft() {
    const order = orderBillController.getOrCreateOrder();
    // get all products in order...
    const products = order.product_ids;
    for (const bill of order.splitInto) {
      // ...and remove those that are already distributed into a split bill
      for (const p of bill.product_ids) {
        products.splice(products.indexOf(p), 1);
      }
    }
    // convert from numeric ids to Product objects
    return products.map((p) => Product.get(p));
  }

  /****
   * Move a product to a split bill
   *
   * Use e.g. `move(null, targetBill, product)` when first moving a product (that is,
   * moving it "from" the original bill) and e.g. `move(sourceBill, targetBill, product)`
   * when moving between split bills.
   *
   * @param {OrderBill|null} from
   * @param {OrderBill|null} to
   * @param {Product} product
   */
  move(from, to, product) {
    undo.push(
      new UndoCommand(() => {
        if (from !== null) {
          const idx = from.product_ids.indexOf(product.id);
          if (idx === -1) {
            throw Error(
              "Attempting to move a product from a split bill which it isn't contained in"
            );
          }
          // remove from source split bill
          from.product_ids.splice(idx, 1);
          from.save();
        }
        if (to !== null) {
          // add to list of products for target split bill
          to.products = [...to.products, product];
          to.save();
        }
      }, undefined)
    );
  }
}

const splitBillController = new SplitBillController();
export default splitBillController;
