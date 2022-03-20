import { AbstractModel } from "./abstract.js";
import User from "./user.js";

export default class Account extends AbstractModel {
  static type = "account";
  static fields = ["user_id", "creditSEK", "topUpStatus"];

  /**
   * @property {number} user_id
   * @property {number} creditSEK
   * @property {"pending"|"paid"} topUpStatus
   */

  /** @returns {User} */
  get user() {
    return User.get(this.user_id);
  }
  /** @param {User} user */
  set user(user) {
    this.user_id = user.id;
  }

  // NOT WORKING
  // get creditSEK() {
  //   return User.get(this.creditSEK);
  // }
  //
  // set creditSEK(credits){
  //   this.creditSEK = credits;
  // }
}
