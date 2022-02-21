import { AbstractModel } from "./abstract.js";
import Party from "./party";

export default class Table extends AbstractModel {
  static type = "table";
  static fields = ["name"];

  /**
   * @property {string} name
   */

  /** @returns {Party[]} */
  get parties() {
    return Party.find({ table_id: this.id });
  }
}
