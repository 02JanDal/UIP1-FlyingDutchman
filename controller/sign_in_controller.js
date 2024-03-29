import User from "../model/user.js";

class UserChangedEvent extends Event {
  /** @type User|null */
  #user;

  /** @return {User|null} */
  get user() {
    return this.#user;
  }

  /**
   * @param {User|null} user
   */
  constructor(user) {
    super("UserChanged");
    this.#user = user;
  }
}

class SignInController extends EventTarget {
  /**
   * Function to check if the user sign in is registered in the database
   * @param username
   * @param password
   * @returns {boolean}
   */
  trySignIn(username, password) {
    const user = User.findFirst({ username, password });
    if (user !== undefined) {
      this.#setCurrentUser(user);
      return true;
    }
    return false;
  }

  /**
   * Setting current user to null
   * when the user doesnt have a VIP account
   * (on Guest account)
   */
  useGuest() {
    this.#setCurrentUser(null);
  }

  /** @param {User|null} user */
  #setCurrentUser(user) {
    localStorage.setItem(
      "flyingdutchman_currentUser",
      user === null ? null : user.id
    );
    this.dispatchEvent(new UserChangedEvent(user));
  }

  /** @returns {User|undefined} */
  get currentUser() {
    const item = localStorage.getItem("flyingdutchman_currentUser");
    return item === undefined ? undefined : User.get(parseInt(item));
  }
}

const signInController = new SignInController();
export default signInController;
