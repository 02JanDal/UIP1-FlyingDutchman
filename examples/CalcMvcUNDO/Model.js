// ===========================================================================
// The model of the calculator. Note that this is not the same thing as
// the dictionary. The model keeps track of the information that is involved
// in the activities in the application, and which, most of them, can change
// overtime.
//
// The data can be stored in the model in many different ways. In this file
// it is stored in simple variables, but for larger programs it is better
// to use a dictionary or other data structure. If we want to save the model,
// it will be tedious to ensure that all the individual variables are saved
// (and restored), whereas a data structure can be saved as a single entity
// in one action. It will also be easier when we use the local storage to
// save data over page refreshes and sessions using Local storage.
//
// ===========================================================================
// Can be extended if necessary.
//
// var result = cnst['start_res'];  // value = 0
// var memory = cnst['start_val'];  // Value = 0

// ===========================================================================
// A model dictionary could then be defined as:
//
var modelData = {}
modelData['result'] = cnst['start_res'];
modelData['memory'] = cnst['start_mem'];
modelData['argument'] = cnst['start_val'];

modelData['orders'] = []

// The model in this version can then easily be transferred into the Local
// or Session storage. The only problem is that local storage does not store
// other data types than strings, so there is a need for conversion back to
// other data types upon retrieving the data from the storage.
//
// ===========================================================================
// END OF FILE
// ===========================================================================






