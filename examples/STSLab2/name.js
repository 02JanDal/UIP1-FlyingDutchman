/**
 * Created by LOe on 07/11/15.
 */
function feedBack() {
    name = document.getElementById("intxt").value;

    if (name != "") {
        document.getElementById("namn").innerHTML = name + " is a beautiful name";
    } else {
        document.getElementById("namn").innerHTML = '<img src="Bear.jpg"> ';

    }
}