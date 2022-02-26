/**
 * Created by Mumriken on 2016-02-04.
 */

// This is the initalisation script. It is performed when the
// document has finished loading.
//
$("document").ready(function() {

    // Change the style on every paragraph - add a border to the style
    //
    $(".c1").addClass("borded");

    // Change the color of the ID so2 to red.
    //
    $("#so1").css("color","red");


    // Replace one text in a paragraph with its reversed version.
    //
    // First we extract the content of the paragraph into a variable
    //
    var temp = $("#rev1").html();

    // Then we replace the content with a reversed version of the string.
    //
    $("#rev1").html(reverse(temp));

    temp = $("p");
    var temp2 = collect(temp);
    $("body").append('<div class="c3">' + temp2 + '</div>');


    // This jQUery call will add an eventlistener for mouseclicks to the object with the ID
    // manipulate (in this case a button).
    //
    $("manipulate").click(changeSpan());

});

// This function takes a string and reverses it.
//
function reverse (s) {

    // Special use of collection variable in a for-loop.
    //
    for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
    return o;
}

// This function collects all the elements in a jSon list (as returned by jQuery calls
// Then it returns all the text in the elements in one single HTML-string.
//
function collect(args) {

    // Find out the length of the structure
    len = args.length;

    // Initialise return variable
    temp = "";

    // Loop through the array, and just collect the content of each element.

    for (var i=0;i< len;i++) {
        temp += args[i].innerHTML;
    }
    return temp;
}

function changeSpan() {

}