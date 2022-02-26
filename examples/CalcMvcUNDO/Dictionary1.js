// ===========================================================================
// In this file we define two structures that will contain the constants,
// as well as the Strings that will be used in the program. It is considered
// good programming hygiene to remove constant values and Strings from the
// actual code. This renders the code easier to read and also easier to modify
// when needed.
//
// ===========================================================================
// The cnst structure will store all kinds of values that will not be modified
// during the running of the program.
//
const cnst = {
    'start_val' : "",
    'start_res' : 0,
    'start_mem' : 0,
    'pie' : 3.1415926  // This is the value of the Mathematical PI
}

// THe dict structure will contain all strings that will be used in the program
// and the strings can easily be inserted at runtime through calls to the dict
// with the correct key.
//
const dict = {
    'add' : "Add",
    'sub' : "Subtract",
    'res' : "Result: ",
    'arg' : "Argument: ",
    'div' : "Divide",
    'mul' : "Multiply",
    'ent' : "ENTER",
    'k1'  : "One",
    'k2'  : "Two",
    'k3'  : "Three",
    'k4'  : "Four",
    'k5'  : "Five",
    'k6'  : "Six",
    'k7'  : "Seven",
    'k8'  : "Eight",
    'k9'  : "Nine",
    'k0'  : "Zero",
    "undo" : "<===",
    "redo" : "===>"
}

// This dictionary is used to distinguish between the text values and the
// numeric values.
//
const value = {
    'k1'  : "1",
    'k2'  : "2",
    'k3'  : "3",
    'k4'  : "4",
    'k5'  : "5",
    'k6'  : "6",
    'k7'  : "7",
    'k8'  : "8",
    'k9'  : "9",
    'k0'  : "0",
}
// ===========================================================================
// END OF FILE
// ===========================================================================
