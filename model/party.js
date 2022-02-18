import { AbstractModel } from "./abstract.js";
import Table from "./table.js";
import OrderBill from "./order_bill";

export default class Party extends AbstractModel {
  static type = "party";
  static fields = ["table_id"];

  /**
   * @property {number} table_id
   */

  /** @returns {Table} */
  get table() {
    return Table.get(this.table_id);
  }
  /** @param {Table} table */
  set table(table) {
    this.table_id = table.id;
  }

  /** @returns {OrderBill[]} */
  get orders() {
    return OrderBill.find({ party_id: this.id });
  }
}
