// this file is inspired by the Undo framework in the Qt library
// https://doc.qt.io/qt-5/qundo.html

export class AbstractUndoCommand {
  constructor() {
    if (this.constructor === AbstractUndoCommand) {
      throw new TypeError(
        "AbstractUndoCommand is an abstract type and should not be directly instantiated"
      );
    }
  }

  /**
   * Perform the command
   *
   * @abstract
   */
  do() {
    throw new Error("You need to implement this method");
  }

  /**
   * Check if the command can be performed
   *
   * @returns {boolean}
   */
  canDo() {
    return true;
  }

  /**
   * Undo/reverse the command
   *
   * @abstract
   */
  undo() {
    throw new Error("You need to implement this method");
  }

  /**
   * Check if the command can be undone/reversed
   */
  canUndo() {
    return true;
  }
}

export class UndoCommand extends AbstractUndoCommand {
  /** @type {() => void} */
  #do;
  /** @type {undefined|(() => void)} */
  #undo;
  /** @type {undefined|(() => boolean)} */
  #canDo;
  /** @type {undefined|(() => boolean)} */
  #canUndo;

  /**
   *
   * @param {() => void} do_    - Perform the command
   * @param {undefined|(() => void)} undo   - Undo/reverse the command
   * @param {undefined|(() => boolean)} canDo   - Check if the command can be performed
   * @param {undefined|(() => boolean)} canUndo - Check if the command can be undone/reversed
   */
  constructor(do_, undo = undefined, canDo = undefined, canUndo = undefined) {
    super();
    this.#do = do_;
    this.#undo = undo;
    this.#canDo = canDo;
    // always false if we don't have an undo function
    this.#canUndo = undo ? canUndo : () => false;
  }

  do() {
    this.#do();
  }
  undo() {
    if (this.#undo) {
      this.#undo();
    }
  }
  canDo() {
    return this.#canDo ? this.#canDo() : super.canDo();
  }
  canUndo() {
    return this.#canUndo ? this.#canUndo() : super.canUndo();
  }
}

class _UndoManager {
  /** @type {AbstractUndoCommand[]} */
  #stack;

  /** @type {number} */
  #index;

  constructor() {
    this.#stack = [];
    this.#index = -1;
  }

  /**
   * Push a command onto the stack and perform it
   *
   * @param {AbstractUndoCommand} cmd
   */
  push(cmd) {
    // remove any commands 'past' the current index; they will no longer be accessible
    this.#stack.splice(this.#index + 1);
    this.#stack.push(cmd);
    this.redo();
  }

  /**
   * Perform the next command on the stack, if possible
   */
  redo() {
    if (
      this.#index >= this.#stack.length ||
      !this.#stack[this.#index + 1].canDo()
    ) {
      return;
    }
    this.#index += 1;
    this.#stack[this.#index].do();
  }

  /**
   * Reverse the current command on the stack, if possible
   */
  undo() {
    if (this.#index < 0 || !this.#stack[this.#index - 1].canUndo()) {
      return;
    }
    this.#index -= 1;
    this.#stack[this.#index].undo();
  }
}

const undo = new _UndoManager();
export default undo;
