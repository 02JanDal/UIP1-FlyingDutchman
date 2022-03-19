import undo, { UndoCommand } from "../util/undo_manager.js";
import security from "../model/security.js";

class SecurityController {
  /**
   * Call security urgently
   */
  callSecurity() {
    undo.push(
      new UndoCommand(
        () => {
          console.warn("Security: Come quickly!");
          security.securityCalled = true;
        },
        () => {
          console.info("Security: Oh, never mind...");
          security.securityCalled = false;
        }
      )
    );
  }

  /**
   * Send a non-urgent report to security
   *
   * @param {string} message
   */
  sendReport(message) {
    undo.push(
      new UndoCommand(
        () => {
          console.info("Security: " + message);
          security.messages.push(message);
        },
        () => {
          console.info("Security: Remove " + message);
          security.messages.splice(security.messages.lastIndexOf(message));
        }
      )
    );
  }
}

const securityController = new SecurityController();
export default securityController;
