import { AbstractModel } from "./abstract.js";

export default class Account extends AbstractModel {
  static type = "account";
  static fields = ["user_id", "creditSEK"];

  /**
   * @property {number} user_id
   * @property {number} creditSEK
   */

  /** @returns {User} */
  get user() {
    return User.get(this.user_id);
  }
  /** @param {User} user */
  set user(user) {
    this.user_id = user.id;
  }
}
