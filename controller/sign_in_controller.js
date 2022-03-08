import User from "../model/user.js";

class SignInController {
  trySignIn(username, password) {
    const user = User.findFirst({ username, password });
    if (user !== undefined) {
      this.#setCurrentUser(user);
      return true;
    }
    return false;
  }

  /** @param {User} user */
  #setCurrentUser(user) {
    localStorage.setItem("flyingdutchman_currentUser", user.id);
  }

  /** @returns {User|undefined} */
  get currentUser() {
    const item = localStorage.getItem("flyingdutchman_currentUser");
    return item === undefined ? undefined : User.get(parseInt(item));
  }
}

const signInController = new SignInController();
export default signInController;
