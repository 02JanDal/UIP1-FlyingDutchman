/**
 * Created by LOe on 07/11/15.
 */

function myDate() {
    temp = Date().split(' ');
    console.log(temp);
    day = getDay(temp[0]);
    date = day + ", " + temp[1] + temp[2] + temp[3] + temp[4];

    document.getElementById('demo').innerHTML = date;
}

function getDay(d) {
    switch (d) {
        case "Mon":
            return("Monday");
        case "Tue":
            return("Tuesday");
        case "Wed":
            return("Wednesday");
        case "Thu":
            return("Thursday");
        case "Fri":
            return("Friday");
        case "Sat":
            return("Saturday");
        case "Sun":
            return("Sunday");
        break;
    }
}