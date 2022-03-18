import undo, { UndoCommand } from "../util/undo_manager.js";
import OrderBill from "../model/order_bill.js";

class SplitBillController {
  /***
   * Creating the split bill
   * PROBLEM: What if the split bill already exists and we only wanna add a new split bill?
   *
   * @param {number} n -- number of people
   * @param {OrderBill} order
   */
  splitBill(n, order) {
    undo.push(
      new UndoCommand(() => {
        for (let i = 0; i < n - 1; i++) {
          const bill = new OrderBill();
          bill.party = order.party;
          bill.save();
          localStorage.setItem("flyingdutchman_currentOrder_" + i, bill.id);
          console.log(bill);
        }
      }, undefined)
    );
  }

  /***
   * Cancelling the split bills
   * Cant undo this
   *
   * @param party
   */
  cancelSplitBill(party) {
    undo.push(
      new UndoCommand(() => {
        let bills = party.orders();
        let singleOrder = bills[0];
        for (let i = 1; i < bills.length - 1; i++) {
          singleOrder.products.concat(bills[i].products);
          this.empty(bills[i].products);
        }
        party.save();
        singleOrder.save();
      }, undefined)
    );
  }

  /***
   * Empty function
   * @param arr
   */
  empty(arr) {
    arr.length = 0;
  }

  /****
   * Choosing the products for each person in the split bill
   * @param product
   * @param groupOrder
   * @param singleOrder
   */
  chooseProductsSplitBill(product, groupOrder, singleOrder) {
    undo.push(
      new UndoCommand(
        () => {
          groupOrder.product_ids.splice(
            groupOrder.product_ids.indexOf(product.id)
          );
          singleOrder.products = [...singleOrder.products, product];
          groupOrder.save();
          singleOrder.save();
        },
        () => {
          singleOrder.product_ids.splice(
            singleOrder.product_ids.indexOf(product.id)
          );
          groupOrder.products = [...groupOrder.products, product];
          groupOrder.save();
          singleOrder.save();
        }
      )
    );
  }
}

const splitBillController = new SplitBillController();
export default splitBillController;
