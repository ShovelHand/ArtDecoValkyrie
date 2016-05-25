This is Alexander Carmichael V00174746's animation participation project.

My project is adapted heavily from the content and example code in "Core HTML5 2d Game Programming" by David Geary.
All art work (such as it is) is my own. The code and art can both be considered placeholder to an actual game I am
planning on making called "Art Deco Valkyrie" because I'm a huge art history nerd, and because HTML5 and JavaScript
are hot right now, and it'd be awesome to have some kind of minimum viable product to show to potential employers.

Because my project is interactive, there is no timeline to speak of.
The Lasseter's principles used are:
**Ease in/out to simulate gravity during the sprite's jump
**Secondary action is represented mostly in her skirt. Jumping and running causes it to move as one would expect
**Exaggeration in all frame sequences. Comic book art was referenced for the poses, and her run, jump, hammer swing
and even idle sequences reflect this. She runs with a pronounced tilt, raises her hammer way over her head, etc.
**Timing and motion are big parts of the hammer swinging sequence.
**Apeal? This is not well represented in the activity so far. I have included in my submission first impression concept art
and costume design that gives a much better idea of the goal for the sprites appearance. I personally think that hero running 
around in an art deco inspired opera valkyrie costume swinging a big hammer is rad as hell.

To play, just double click on index.html. I DEBUGGED AND TESTED EXCLUSIVELY IN GOOGLE CHROME, AND OTHER BROWSERS *DO* YIELD
SLIGHTLY DIFFERENT PRODUCTS
key mappings are...
d: run left
k: run right
j: jump
s: swing hammer

Some limitations not fixed due to having too much work to do:
**Upon landing from a jump, she goes into the idle sequence even if you're holding down on a run button. Adding a check for
keydown is on the todo list to make jump completion a bit more graceful. Press run to run once landed.
**I'd have liked to get it so that one 's' press gives one hammer swing rather than looping the animation. I sorta know how
to go about fixing this, but this is as good as it gets for now.
**Artwork is obviously not complete.
**No sound!
**Collision detection is not currently implemented at all. It's lame that she has that hammer and nothing to smash up. Again, this 
is a time issue.