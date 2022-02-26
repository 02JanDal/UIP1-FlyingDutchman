<H1>Some advice for testing: </H1>

There are two different style sheets that can be used in the "Layers and positioning" file project: main.css, and main2.css.
The content of these files are essentially the same apart
from how the header and footer are defined. In **<tt>main.css</tt>**, the header is just 
transparent, whereas in **<tt>main2.css</tt>**, we use the linear gradient
in order to create the transparency. 

Make sure that you understand how the2 css works, including the role of overriding sheets. 

The styles are applied in order from top to bottom, which means that if you have
a redefinition of a certain style, the second version will be applied,
which can cause some very frustrating experiences if you edit the wrong definition. 

Experiment around and see what happens when you change the css styles concerning positioning and colour, for example.

<h1>The canvas files.</h1>

There are two instances of pure canvas applications, and he Canvas element will be addressed further in a later sample as well. Here it is only shown how to 
create a canvas and apply some fixed graphics to it. 

