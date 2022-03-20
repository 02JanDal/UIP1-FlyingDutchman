import { AbstractModel } from "./abstract.js";
import Party from "./party.js";
import Product from "./product.js";

export default class OrderBill extends AbstractModel {
  static type = "order_bill";
  static fields = ["party_id", "product_ids", "status", "splitFrom_id"];

  /**
   * @property {number} party_id
   * @property {number[]} product_ids
   * @property {"pending"|"placed"|"fulfilled"|"payed"} status
   * @property {number|undefined} splitForm_id
   */

  /** @returns {Party} */
  get party() {
    return Party.get(this.party_id);
  }
  /** @param {Party} party */
  set party(party) {
    this.party_id = party.id;
  }

  /** @returns {Product[]} */
  get products() {
    return this.product_ids.map((id) => Product.get(id));
  }
  /** @param {Product[]} products */
  set products(products) {
    this.product_ids = products.map((p) => p.id);
  }

  /** @returns {OrderBill} */
  get splitFrom() {
    return OrderBill.get(this.splitFrom_id);
  }
  /** @param {OrderBill} order_bill */
  set splitFrom(order_bill) {
    this.splitFrom_id = order_bill.id;
  }

  /**
   * Return the order bills this one is split into (if any)
   * @returns {OrderBill[]}
   * */
  get splitInto() {
    return OrderBill.find({ splitFrom_id: this.id });
  }
}
