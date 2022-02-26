// ===========================================================================
// In this file we define the actual functions that will perform the
// work on the model. These functions have to know about the data types,
// which is why we use the parseInt function, since values fetched from
// the HTML entries will be in the form of Strings.
//
// ===========================================================================
// The add function returns the value of adding two numbers.
//
function add(a,b) {
    // return a + b;
    return parseInt(a) + parseInt(b);
}


// The sub function returns the value of subtracting one number from
// the other.
//
function sub(a,b) {
    // return a - b;
    return parseInt(a) - parseInt(b);
}


// The store function will store a value in the separate memory, e.g.,
// to allow for repeating a calculation with the same numbers.
//
function store(a) {
    memory = parseInt(a);
}

// ===========================================================================
// END OF FILE
// ===========================================================================









