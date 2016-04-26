$(document).ready(function() {
  window.dancers = [];
  
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

  // //refactor later to some function that can set initial position for us
  // for (var i = 0; i < 12; i++) {
  //   var x;
  //   if (i < 6) {
  //     x = -70;
  //   } else {
  //     x = $('body').width() + 50;
  //   }
  //   var y = $('body').height() / 2;
  //   var newDancer = new makeBlueDancer(y, x, 1000);
  //   window.dancers.push(newDancer);
  //   $('body').append(newDancer.$node);
  // }

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

