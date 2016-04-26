$(document).ready(function() {
  window.dancers = [];
  console.log(window.dancers);

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $('.lineEmUpButton').on('click', function(event) {
    var firstDancer = window.dancers[0];
    var y = $('body').height() / 2;
    var x = $('body').width() * 0.05;
    firstDancer.setPosition(y, x);

    for (var i = 1; i < window.dancers.length; i++) {
      window.dancers[i].setPosition(y, x += 50);
    }
  });

  $('.scramble').on('click', function(event) {
    var y = $('body').height() * Math.random();
    var x = $('body').width() * Math.random();

    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].setPosition(y, x);
      y = $('body').height() * Math.random();
      x = $('body').width() * Math.random();
    }
  });
});

