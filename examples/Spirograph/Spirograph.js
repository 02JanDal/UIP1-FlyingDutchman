/**
 * File: Spirograph.js
 *
 * This file contains the javaScript needed to calculate the rotation of a square
 * and a point on the square. In parallel, a separate canvas tracks the drawing
 * without the confining square.
 *
 * Version 0.5
 * Author: Lars Oestreicher
 */

function canvasApp() {

    // We use two canvases, one for the machinery, and one for the pure drawings
    //
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    // The second canvas, canvas2 is used for the final drawing, but uses the same transformation schemes
    // as canvas1.
    //
    var canvas2 = document.getElementById("Spiro1");
    var drawingctx = canvas2.getContext('2d');

    // The position of the rotating rectangle.
    //
    var x = 100;
    var y = 100;

    // We use two variables to store the complete rotation angle, and the angle
    // increment for each steo in the process
    //
    var rotationAngle = 0;
    var angleInc = 0.01;

    //********
    // OBJECT: REctangle
    //********
    // The rectangle is specified in a variable. Note that the rectangle has its own functions defined within
    // the variable
    //
    var rect1 = {
        xPos: 100,
        yPos: 100,
        width: 100,
        height:100,
        focusX: 60,  // This is the point that is drawing the line within the rectangle.
        focusY: 60,  // X and Y coordinates

        // The individual rotation for the rectangle is contained in this variable.
        // It will be calculated separately for each individual rectangle.
        //
        rotation: 0,

        // Note that we use a variable to contain an object, in this case a rectangle to be drawn.
        // This means that the function is defined slightly different than in a standard JavaScript file.
        //
        drawMe : function () {

            // Calculating center of rotation. This has to be offset from the anchor point when the
            // rectangle is roatated in order to have it rotating around the center.
            //
            var cx = this.xPos + 0.5 * this.width;
            var cy = this.yPos + 0.5 * this.height;

            //*********
            // Canvas 1
            //*********

            // Save the graphic context before applying transformation.
            //
            ctx.save();

            // Now calculate the rotation about the center of the image. We use transformations
            // on the context to do this.
            //
            ctx.translate( cx, cy );
            ctx.rotate(this.rotation);
            ctx.translate(-cx, -cy );

            // Here is where the actual drawing is made. First the rectangle. Only the strokes, no filling. 
            //
            ctx.fillStyle = "#92B901";  // If you want to have a background colour on the rectangle then use
                                        // fillrect instead of strokerect!
            //
            ctx.strokeRect(this.xPos, this.yPos, 100, 100);

            // Setting filling colour to pure red.
            //
            ctx.fillStyle = "#FF0000";

            // We use a small filled rectangle (2px by 2px) to set points on the canvas.
            //
            ctx.fillRect(this.xPos + this.focusX, this.yPos + this.focusY, 2,2);

            // Restore the previous context. If we forget this, we might get very strange results.
            //
            ctx.restore();

            //*********
            // Canvas 2
            //*********

            // Saving the graphic context of the second Canvas
            //
            drawingctx.save();

            // As in canvas 1 above, the rotation of the image (just the one dot) is calculated and then drawn
            // using transformations
            //
            drawingctx.translate( cx, cy );
            drawingctx.rotate(this.rotation);
            drawingctx.translate(-cx, -cy );

            // Setting fill colour to pure red (since this is a different drawing context).
            //
            drawingctx.fillStyle = "#FF0000";

            // On the second canvas we use a single px for the drawing of the line.
            //
            drawingctx.fillRect(this.xPos + this.focusX, this.yPos + this.focusY, 1,1);

            // Finally we restore the graphic context for the next call.
            //
            drawingctx.restore();

        },

        // Function that calculates the new angle of rotation for the object.
        //
        rotateMe : function () {

            // We increase the angle of rotation with the set increase.
            //
            this.rotation += angleInc;
            if (this.rotation > 2 * Math.PI) {
                rotation = 0;
            }
        },

        // Given a specified point in space (2D), the touchPoint function calculates
        // the point where a line touches the circumference of the object. This has to
        // be different to every different shape.
        //
        // TODO: This function is not finished yet.
        // We have to add the detection of other objects to the calculation
        //
        //
        touchPoint : function (x, y) {

            // Calculating actual center of object by using the offset.
            //
            var cx = this.xPos + 0.5 * this.width;
            var cy = this.yPos + 0.5 * this.height;

            // NOTE: I am not sure about how to calculate the touching point.
            // The following two lines might be descarded and/or rewritten.
            //
            deltaX = x - cx / 2;
            deltaY = y - cx / 2;

        }

    }

    //*********
    // END: Rectangle
    //*********

    // All objects will be stored in an array.
    //
    var objects = [ ];

    // When the document has been loaded and initialised, we call a looping function.
    //
    $(document).ready(function () {

        // Redraw the screen 100 times per second. This is a bit much, we can probably relax this measure a bit.
        // Interval is measured in millisecs.
        //
        setInterval(drawScreen, 10);

    });

    // This function is the overall drawing function, which is currently only redrawing the single rectangle.
    //
    // TODO: refine this function so that it can handle several instances of an object in the array objects[].
    // To do this we use a loop over all objects in objects[] and call the methods rotateMe() and drawMe()
    // for each object.
    //
    function drawScreen() {

        // Clear the canvas
        //
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ask the object to recalculate the rotation itself.
        //
        rect1.rotateMe();

        // Ask the object to redraw itself on the screen.
        //
        rect1.drawMe();

    }

}

// Finally we call the application setup.
//
canvasApp();

//************
// END of file Spirograph.js
//************