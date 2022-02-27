/**
 * When using the built-in webserver in Intellij-based IDEs we get an automatic prefix for the
 * project. For some stuff, like using dynamic module imports (`await import(...)`) we need the
 * full, absolute path, so we compute it here for later usage.
 */
const prefix = location.pathname.substring(
  0,
  location.pathname.lastIndexOf("/")
);

// ==== DOM Utility Functions from PastryKit === //
Element.prototype.hasClassName = function (a) {
  return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};
Element.prototype.addClassName = function (a) {
  if (!this.hasClassName(a)) {
    this.className = [this.className, a].join(" ");
  }
};
Element.prototype.removeClassName = function (b) {
  if (this.hasClassName(b)) {
    var a = this.className;
    this.className = a.replace(
      new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"),
      " "
    );
  }
};
Element.prototype.toggleClassName = function (a) {
  this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

/**
 * Fetches a view based on a `name` and puts it inside an element as given by a CSS selector
 *
 * @param {string} name - The name of the view, which will be used to build its file name
 * @param {string} target - The CSS selector for the element into which the view will be loaded
 */
export async function loadView(name, target) {
  const response = await fetch(prefix + "/view/" + name + ".html");
  findOneOrFail(target).innerHTML = await response.text();
  await import(prefix + "/view/" + name + ".js");
}

/**
 * Sets which primary view is visible to the user. The currently visible
 * view gets hidden.
 *
 * @param {string} name - The name of the view to show
 */
export function setMainView(name) {
  for (const el of document.querySelectorAll(
    "body > div.visible:not(#" + name + ")"
  )) {
    el.removeClassName("visible");
  }
  findOneOrFail("body > div#" + name).addClassName("visible");
}

/**
 *
 * @param {string} selector - A CSS selector
 * @returns {HTMLElement}
 */
export function findOneOrFail(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    throw Error("Could not find required selector: " + selector);
  }
  return el;
}
