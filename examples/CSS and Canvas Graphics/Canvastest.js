/**
 * Created by LOe on 20/02/15.
 */
window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    drawScreen();


    function drawScreen() {
        // The canvas element is given the ID "canvasOne".
        //
        var theCanvas = document.getElementById('canvasTwo');

        // Checking that the Canvas is instantiated properly before we try to use it.
        //
        if (theCanvas && theCanvas.getContext) {

            // Painting is done in the 2d context, so we check for that as well, before we use it.
            //
            var ctx = theCanvas.getContext("2d");

//==============================================================================================
// Up to here is a standard initialisation part of the Javascript. No drawing has been made yet.
//==============================================================================================

            // The standard fillRect command makes black rectangles.
            //
            ctx.fillRect(20,20,80,95);

            // Setting the fill colour to a grey. Puts a slight 2D (covering) effect.
            //
            ctx.fillStyle ="grey";
            ctx.fillRect(40,40,80,90);

            // Add a red outline. This is done by adding a unfilled rectangle outside of the previous one.
            //
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(39,39,82,92);

            // Making a circle is slightly more difficult. However, we can draw both fill and stroke for the same
            // shape.
            //
            ctx.beginPath();
            ctx.arc(300, 200, 50, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'lightGreen';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FF3333';
            ctx.stroke();

            // And we may even use a gradient fill,
            // or as in this case some transparency.
            //
            ctx.beginPath();
            ctx.arc(320, 210, 50, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,0,0,.5)';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#FF3333';
            ctx.stroke();

            // Some line drawings... Note that the line color in the first line
            // is the same as the stroke in the previous circle.
            //
            ctx.beginPath();
            ctx.moveTo(100, 150);
            ctx.lineTo(450, 50);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.lineWidth = 10;
            ctx.moveTo(460,70);
            ctx.lineTo(550,150);
            ctx.lineTo(350,300);
            ctx.lineTo(100,150);
            ctx.lineCap = "round";   // Rounded ends of line.
            ctx.lineJoin ="round";   // Rounded corners of the line.
            ctx.stroke();

            var rectWidth = 150;
            var rectHeight = 75;

            // Save the context
            //
            ctx.save();

            // translate context to center of canvas
            //
            ctx.translate(400, 150);

            // rotate 45 degrees clockwise
            //
            ctx.rotate(Math.PI / 4);

            ctx.fillStyle = 'blue';
            ctx.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);

            // Restore the context to remove the transformations
            //
            ctx.restore();

            // Note that the rectangle after the restoration of the state is again un-slanted
            // and has the previous fill colour (from the red circle).
            //
            ctx.fillRect(450, 300, rectWidth, rectHeight);

        }
    }
}
