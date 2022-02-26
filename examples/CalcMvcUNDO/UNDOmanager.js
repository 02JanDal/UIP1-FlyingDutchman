// The data base for the UNDO-REDO mechanism is stored in two stacks
// Both of these are empty to start with.
//
let undostack = [];
let redostack = [];

// The UNDO-manager consists of three functions. In this version they are
// rudimentary, in that they don't check for an empty stack before trying.
// Adding these checks is an easy task.
//
// The UNDO-manager requires that the functions are stored as objects with three
// functions each: execute, unexecute and reexecute. Since the model is very
// small here, the functins are also necessarily simple. With more complex
// models, the functions for this will also grow.
//
// Note, however. that the undo-mechanism does not need to know anything
// about the model or the functions themselves. It just executes the appropriate
// function for the respective moments.
//
// ==========================================================================
// the doit function executes the function and then stores the function object
// on the UNDO-stack.
//
// Note that when a new function is executed, the REDO-stack has to be reset!
//
function doit(funcobj) {
    funcobj.execute();
    undostack.push(funcobj);
    redostack = [];
    update_view();
}

// ==========================================================================
// The undoit first pops the function object from the UNDO-stack, then executes
// UNDO-function and stores the function object on the REDO-stack.
//
function undoit() {
    funcobj = undostack.pop();
    funcobj.unexecute();
    redostack.push(funcobj);
}

// ==========================================================================
// The redoit function pops the function object from the REDO-stack, executes
// the REDO-function and then pushes the function object onto the UNDO-stack.
//
function redoit() {
    funcobj = redostack.pop();
    funcobj.reexecute();
    undostack.push(funcobj);
}

// ==========================================================================
// ================================ END OF FILE =============================
// ==========================================================================
