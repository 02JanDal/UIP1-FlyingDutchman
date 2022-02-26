/**
 * Created by LOe on 23/02/15.
 */
window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function canvasApp() {
    draw();


    function draw() {

        // A shorter version of getting the 2d-context
        //
        let ctx = document.getElementById('canvasThree').getContext('2d');
        ctx.fillRect(0, 0, 300, 300);      // The background of the canvas will be filled with black (default).

        // Move the drawing of the circle to the center of the canvas element. The "translate" transform will
        // move the coordinate system and change the points of reference, whereas the moveTo(...) command will
        // move the pen point using the same coordinate system!
        //
        ctx.translate(150, 150);

        // Create a circular clipping path, creating the circle in which to draw the stars.
        //
        ctx.beginPath();
        ctx.arc(0, 0, 120, 0, Math.PI * 2, true);
        ctx.clip();

        // Draw background using a gradient fill
        //
        let lingrad = ctx.createLinearGradient(0, -150, 0, 150);
        lingrad.addColorStop(0, '#232256');
        lingrad.addColorStop(1, '#143778');

        ctx.fillStyle = lingrad;

        // We fill the rectangle, however, only the area defined by the clipping path will be drawn in the new colour.
        //
        ctx.fillRect(-150, -150, 300, 300);

        // Draw 50 stars. In a larger application we would store the number of stars (and possibly other values)
        // in a variable. Now we use hard-coded values for demonstration.
        //
        for (let j = 1; j < 50; j++) {
            ctx.save();                          // Save the context
            ctx.fillStyle = '#fff';

            // The stars are positioned in a random fashion (pseudo-random) using a translate (rather than a moveTo).
            // This means we can use the same function to draw a star regardless of the position on the canvas.
            // However, this also means we should use the context.save() (above) and the context.restore() functions
            // in this loop. We don't want the stars' positions to be dependent on each other.
            //
            ctx.translate(150 - Math.floor(Math.random() * 300),
                150 - Math.floor(Math.random() * 300));
            drawStar(ctx, Math.floor(Math.random() * 4) + 2);

            ctx.restore();                      // Restore the context
        }

    }
    // ==============================================================================================================
    // It is very common in graphic application to separate functionality into smaller functions, and then
    // passing the context as an argument to the function. Note that in these functions, it is safest to save
    // the original context and restore it before exiting the function. This means that each function is responsible
    // for its own changes, and does not rely on the settings of another function.
    //
    function drawStar(ctx, r) {
        ctx.save();                             // Save the context

        ctx.beginPath()

        // A star is a closed path of lines placed around the center. Here we use the rotation transform, and draw
        // the same line a number of times, while rotating the (context of) the image. This greatly enhances the
        // simplicity of the algorithm, and reduces the number of calculations.
        //
        ctx.moveTo(r, 0);
        for (let i = 0; i < 9; i++) {
            ctx.rotate(Math.PI / 5);
            if (i % 2 == 0) {
                ctx.lineTo((r / 0.525731) * 0.200811, 0);
            } else {
                ctx.lineTo(r, 0);
            }
        }
        ctx.closePath();

        // Fill the path with white colour.
        //
        ctx.fill();
        ctx.restore();                          // Restore the context.
    }
}