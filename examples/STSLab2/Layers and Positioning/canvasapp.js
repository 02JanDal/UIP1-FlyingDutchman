/**
 * Created by LOe on 20/02/15.
 */
window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasApp(){
    drawScreen();


    function drawScreen() {
        // The canvas element is given the ID "canvasOne".
        //
        var theCanvas = document.getElementById('canvasOne');

        // Checking that the Canvas is instantiated properly before we try to use it.
        //
        if (theCanvas && theCanvas.getContext) {

            // Painting is done in the 2d context, so we check for that as well, before we use it.
            //
            var ctx = theCanvas.getContext("2d");
            if (ctx) {

                // Define the background rectangle.
                //
                ctx.rect(0,0,theCanvas.width, theCanvas.height);


                // add linear gradient, the size of the canvas.
                //
                var grd = ctx.createLinearGradient(0, 0, theCanvas.width, theCanvas.height);

                // from light blue
                //
                grd.addColorStop(0, '#8ED6FF');

                // to red
                //
                grd.addColorStop(1, '#FF5555');

                // Set the background fill to the created gradient.
                //
                ctx.fillStyle = grd;
                ctx.fill();

                // First we paint with a 5 px wide blue stroke.
                //
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 5;

                // stroke a simple bezier curve
                //
                ctx.beginPath();
                ctx.moveTo(50,200);
                ctx.bezierCurveTo(50,300,200,100,200,150);
                ctx.stroke();

                // now make the control points visible
                //
                ctx.strokeStyle = "rgba(0,0,0,.25)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(50,200);
                ctx.lineTo(50,300);
                ctx.lineTo(200,100);
                ctx.lineTo(200,150);
                ctx.stroke();

                // stroke a quadratic curve
                //
                ctx.strokeStyle = "green";
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(400,200);
                ctx.quadraticCurveTo(500,100,600,150);
                ctx.stroke();

                // now make the control points visible
                //
                ctx.strokeStyle = "rgba(0,0,0,.25)";  // A bit transparent stroke to de-emphasize
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(400,200);
                ctx.lineTo(500,100);
                ctx.lineTo(600,150);
                ctx.stroke();

                // Painting the pixels at the endpoints
                //
                ctx.strokeStyle = "rgba(255,0,0,1)";  // if a = 1, then it is not transparent.
                ctx.fillRect(49,299,4,4);
                ctx.fillRect(198,99,4,4);
                ctx.fillRect(499,99,4,4);

                // Make a Header. The alignment sometimes requires a bit of testing and
                // adjusting.
                //
                ctx.font = "20pt sans-serif";
                ctx.fillStyle = "red";
                ctx.fillText("A Bezier Curve",50,50);

                ctx.font = "20pt sans-serif";
                ctx.fillStyle = "red";
                ctx.fillText("A Quadratic Curve",400,50);
            }
        }
    }

}