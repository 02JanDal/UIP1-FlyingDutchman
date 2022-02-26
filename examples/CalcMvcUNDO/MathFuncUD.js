// ===========================================================================
// In this file we define "Objects" for the actual functions that will perform the
// work on the model. These functions have to know about the data types,
// which is why we use the parseInt function, since values fetched from
// the HTML entries will be in the form of Strings.
//
// In order to be able to use the UNDO-manager the functions have to be
// defined with all three actions as "execute", "unexecute" and "reexecute".
//
// The names of the functions are mnemonic for our purposes, they could
// just as well have been named "fun1", "fun2" etc. as long as we keep
// track of which is which.
//
// Currently it is just the names of the functions that give a semantic
// connection between the layers. However, it would be completely possible
// to refactor the code into using general names (although that is not desirable
// from a documentation point of view!).
//
// ===========================================================================
// The addfun function returns the value of adding two numbers.
//
function addfun(a, b) {
    var tempFunObject = {

        // adapt arguments
        //
        arg: parseInt(a),           // BeerId
        oldsum: parseInt(b),        // OrderList

        // replace function body
        //
        execute: function () {      // The original action
            modelData['result'] = this.arg + this.oldsum;
            update_view();
        },

        unexecute: function () {    // Undoing the action
            modelData['result'] = this.oldsum;
            update_view();
        },

        reexecute: function () {    // Redoing the action is the same as doing it
                                    // the first time.
            modelData['result'] = this.arg + this.oldsum;
            update_view();
        }
    }
    return tempFunObject;
}

// ===========================================================================
// The subfun function returns the value of adding two numbers.
//
function subfun(a, b) {
    var tempFunObject = {
        arg: parseInt(a),
        
        oldsum: parseInt(b),

        execute: function () {
            modelData['result'] = this.oldsum - this.arg;
            update_view();
        },
        unexecute: function () {
            modelData['result'] = this.oldsum;
            update_view();
        },
        reexecute: function () {
            modelData['result'] = this.oldsum - this.arg;
            update_view();
        }
    }
    return tempFunObject;
}

// Here it is possible to add all the other functions that are needed to complete
// the functionalty of the calculator.

// ===========================================================================
// END OF FILE
// ===========================================================================





