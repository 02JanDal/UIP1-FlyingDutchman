class SecurityModel {
  /** @type {boolean} */
  securityCalled = false;

  /** @type {string[]} */
  messages = [];
}

const security = new SecurityModel();
export default security;
