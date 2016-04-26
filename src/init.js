$(document).ready(function() {
  window.dancers = [];
  var ghosts = [];
  var ghostTags = ['img/orangey.png', 'img/pinky.png', 'img/redy.png', 'img/whitey.png'];
  
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

//add start button
  $('.logo').animate({
    left: $('body').width() * .40,
    top: $('body').height() * .45
  }, 1500);

//add play button
  $('.play').animate({
    left: $('body').width() * .46,
    top: $('body').height() * .55
  }, 1500);

  $('.makePacman').on('click', function() {
    var pacman = new makePacman($('body').height() / 2, $('body').width() + 50, 150 );
    pacman.$node.css({transform: 'rotate(180deg)'});
    pacman.vx = pacman.speed * -1;
    console.log();
    pacman.vy = 0;
    $('.menu').toggleClass('hidden');
    $('body').append(pacman.$node);

    //add ghosts and move them from left to center.

    // player input handler
    //arrow keys 37,38,39,40 clockwise from left
    $(document).on('keydown', function(event) {
      if (event.which === 37) {
        // left
        pacman.vx = pacman.speed * -1;
        pacman.vy = 0;
        pacman.$node.css({transform: 'rotate(180deg)'});
      } else if (event.which === 38) {
        // top
        pacman.vx = pacman.driftCorrection;
        pacman.vy = pacman.speed * -1;
        pacman.$node.css({transform: 'rotate(-90deg)'});
      } else if (event.which === 39) {
        // right
        pacman.vx = pacman.speed * -1;
        pacman.vy = 0;
        pacman.$node.css({transform: 'rotate(0deg)'});
      } else if (event.which === 40) {
        // bottom
        pacman.vx = pacman.driftCorrection;
        pacman.vy = pacman.speed * -1;
        pacman.$node.css({transform: 'rotate(90deg)'});
      } 
    });
    //create ghosts and add to the body
    for (var i = 0; i < ghostTags.length; i++) {
      var x = -50;
      var y = $('body').height() / 2;
      var ghost = new makeGhost(y, x, 1000, ghostTags[i]);
      ghosts.push(ghost);
      $('body').append(ghost.$node);
    }
    ghostEnter();
  });
  //brings ghosts from the left side of the screen at start
  var ghostEnter = function() {
    var spacing = ($('body').width()) * .25 / (ghosts.length + 1);
    var x = (spacing + .65 * $('body').width()) / 2 + 5;
    for (var i = 0; i < ghosts.length; i++) {  
      ghosts[i].$node.animate({
        left: x,
      }, 2000);  
      x += spacing;
    }
  };

// UNUSED FUNCTIONS FROM OUR FIRST TRY BLEOW THIS LINE

//this lines up all the nodes on the page
  // var line = function() {
  //   var spacing = ($('body').width()) * .8 / (window.dancers.length + 1);
  //   var x = (spacing + .2 * $('body').width()) / 2 + 5;
  //   for (var i = 0; i < window.dancers.length; i++) {  
  //     window.dancers[i].$node.animate({
  //       left: x,
  //       height: 200
  //     }, 1000);  
  //     x += spacing;
  //   }
  // };

  // $('.lineEmUpButton').on('click', line);
  // // $('.lineEmUpButton').on('click',function(){

  // $('body').on('click', '.blue', function() {
  //   if ($(this).hasClass('solo')) {
  //     line();
  //     $(this).removeClass('solo');
  //   } else {
  //     $(this).addClass('solo');
  //     $(this).animate({
  //       left: $('body').width() / 2,
  //       height: 400
  //     }, 1000);
  //   }
  // });

  // $('.scramble').on('click', function(event) {
  //   var randomDancer1 = window.dancers[Math.floor(Math.random() * 6)];
  //   var randomDancer2 = window.dancers[Math.floor(Math.random() * 6) + 6];
  //   randomDancer1.$node.animate({
  //     left: $('body').width() / 2
  //   }, 1000);
  //   randomDancer2.$node.animate({
  //     left: $('body').width() / 2 + 55
  //   }, 1000);


  // });


});

