// ===========================================================================
// Note that the functions in the control layer do not know anything about the
// data, neither what type the arguments or the results are, nor what the
// actual function does. It just makes sure to call the appropriate functions
// and updates the model with the result, and then updates the view from the model.
//
// The variable names and the function names are chosen to be human readable, which
// also includes the addition of some semantic. However, the interpretation of
// the activities as numbers, are not mandatory, it could be used for string
// concatenation actions as well.
// ===========================================================================
// The function doAdd gets the data from the input fields in
// the HTML and performs the appropriate addition function.
//
// ===========================================================================

function add(key){
    $("#argument").text($("#argument").text() + value[key]);
}

function doInit(fun) {
    if (fun == 'fun1') {
        a = $("#argument").text(); // Get the argument
        b = modelData['result'];  // Get the current result value
        doit(addfun(a,b));
    };
    if (fun == 'fun2') {
        a = $("#argument").text(); // Get the argument
        b = modelData['result'];  // Get the current result value
        doit(subfun(a,b));
    };
    update_view();
}

// When updating the database (the model), the result is stored
// in the correct variable in the model.
//
function update_result(c) {
    modelData['result'] = c;
}

// The update_view function takes the result from the storage and puts
// in the corresponding HTML-container, the display-div.
//
function update_view() {
    $("#display").text(modelData['result']);
    $("#argument").text(modelData['argument']);
}

// ===========================================================================
// INITIALIZATION OF HTML AND MODEL DATA.
// ===========================================================================
// This construct ensures that the document is finished loading before
// the code below is executed. This is essentially the initialisation
// of the HTML-page, which should be completely empty of content in the
// program before start.
//
// The initialisation data could just as well have been fetched from a
// file or other storage.
//
// Note that we make use of two dictionaries, the storage for constant values,
// and a dictionary for strings. Both these will be useful later.
//
$(document).ready(function () {
    $("#sum-tag").text(dict['res']);
    $("#arg-tag").text(dict['arg']);
    $("#fun1").text(dict['add']);
    $("#fun2").text(dict['sub']);
    $("#fun3").text(dict['mul']);
    $("#fun4").text(dict['div']);
    $("#fun5").text(dict['ent']);

    $("#k1").text(dict['k1']);
    $("#k2").text(dict['k2']);
    $("#k3").text(dict['k3']);
    $("#k4").text(dict['k4']);
    $("#k5").text(dict['k5']);
    $("#k6").text(dict['k6']);
    $("#k7").text(dict['k7']);
    $("#k8").text(dict['k8']);
    $("#k9").text(dict['k9']);
    $("#k0").text(dict['k0']);

    $("#arg").text(cnst['start_val']);
    $("#display").text(cnst['start_val']);

    $("#undo").text(dict['undo']);
    $("#redo").text(dict['redo']);
});

// ===========================================================================
// END OF FILE
// ===========================================================================


