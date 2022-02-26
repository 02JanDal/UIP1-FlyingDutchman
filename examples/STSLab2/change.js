/**
 * Created by LOe on 07/11/15.
 */

function change() {

    textString = document.getElementById("intxt").value;

    if (document.getElementById("No1")) {
        document.getElementById("No1").innerHTML=textString;
        document.getElementById("No1").setAttribute("id", "No2");
           }    else {
        document.getElementById("No2").innerHTML=textString;
        document.getElementById("No2").setAttribute("id", "No1");
    }
}