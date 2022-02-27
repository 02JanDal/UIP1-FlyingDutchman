import { AbstractModel } from "./abstract.js";
import Account from "./account.js";

export default class User extends AbstractModel {
  static type = "user";
  static fields = [
    "credentials",
    "password",
    "username",
    "firstName",
    "lastName",
    "email",
    "phone",
  ];

  /**
   * @property {string} credentials
   * @property {string} password
   * @property {string} username
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} email
   * @property {string} phone
   */

  /** @returns {Account} */
  get account() {
    return Account.findFirst({ user_id: this.id });
  }
}
