import { AbstractModel } from "./abstract.js";
import Party from "./party.js";

export default class Table extends AbstractModel {
  static type = "table";
  static fields = [
    "status",
    "party_id",
  ];
  

  /**
   * @property {string} name
   */

  /** @returns {Party[]} */
  get parties() {
    return Party.find({ table_id: this.id });
  }
}
