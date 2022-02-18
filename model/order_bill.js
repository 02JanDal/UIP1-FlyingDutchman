import { AbstractModel } from "./abstract.js";
import Party from "./party";
import Product from "./product";

export default class OrderBill extends AbstractModel {
  static type = "order_bill";
  static fields = ["party_id", "product_ids", "status"];

  /**
   * @property {number} party_id
   * @property {number[]} product_ids
   * @property {"pending"|"placed"|"fulfilled"|"payed"} status
   */

  /** @returns {Party} */
  get party() {
    return Party.get(this.party_id);
  }
  /** @param {Party} party */
  set table(party) {
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
}
