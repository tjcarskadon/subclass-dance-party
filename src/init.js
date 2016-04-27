$(document).ready(function() {
  window.dancers = [];
  var pellets = [];
  var ghosts = [];
  var score = 0;
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
    left: $('body').width() * .48,
    top: $('body').height() * .55
  }, 1500);

  //animate game over button l -> to center
  var gameOver = function () {
    //animate pacman's death

    $('.game-over').animate({
      left: $('body').width() * .38,
      top: $('body').height() * .40
    }, 1500);
  }; 


  var collisionDetection = function (obj1, obj2) {
    var x1 = obj1.$node.offset().left;
    var x2 = obj2.$node.offset().left;
    var y1 = obj1.$node.offset().top;
    var y2 = obj2.$node.offset().top;
    var w1 = obj1.$node.width() + 3;
    var w2 = obj2.$node.width() + 3;
    var h1 = obj1.$node.height() + 3;
    var h2 = obj2.$node.height() + 3;
    if (x1 < x2 + w2 && 
      x1 + w1 > x2 &&
      y1 < y2 + h2 &&
      h1 + y1 > y2) {
      return true; 
    } else {
      return false;
    }
  };

  $('.makePacman').on('click', function() {
    //make pacman
    var pacman = new makePacman($('body').height() / 2, $('body').width() + 50, 150);
    pacman.$node.css({transform: 'rotate(180deg)'});
    pacman.vx = pacman.speed * -1;
    pacman.vy = 0;
    $('.menu').toggleClass('hidden');
    $('body').append(pacman.$node);
    // pacman.step();

    
    //create ghosts and add to the body
    for (var i = 0; i < ghostTags.length; i++) {
      var x = -50 - 100 * i;
      var y = $('body').height() / 2;
      var ghost = new makeGhost(y, x, 150, ghostTags[i]);
      ghost.startPosition = $('body').width() * 0.3 - 80 * i;
      console.log(ghost.vx);
      ghosts.push(ghost);
      pacman.vx = pacman.speed * 1;
      $('body').append(ghost.$node);
    }
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
        pacman.vx = pacman.speed;
        pacman.vy = 0;
        pacman.$node.css({transform: 'rotate(0deg)'});
      } else if (event.which === 40) {
        // bottom
        pacman.vx = pacman.driftCorrection;
        pacman.vy = pacman.speed;
        pacman.$node.css({transform: 'rotate(90deg)'});
      } else if (event.which === 73) { // letter i
        // cheat mode!
        for (var j = 0; j < ghosts.length; j++) {
          ghosts[j].makeVulnerable();
        }
      } 
    });

    //pacman dies 
    var death = function () {
      // var deathFrames = ['img/dyingF0.png', 'img/dyingF1.png', 'img/dyingF2.png', 'img/dyingF3.png', 'img/dyingF5.png', 'img/dyingF6.png', 'img/dyingF7.png'];
      pacman.dead = true;
      pacman.frame = 0;
      for (var g = 0; g < ghosts.length; g++) {
        ghosts[g].dead = true;
      }
        // pacman.$node.css({transform: 'rotate(-90deg)'});
      for (var i = 0; i <= pacman.deathFrames.length; i++) {
        setTimeout(function() {
          pacman.$node.attr('src', pacman.deathFrames[pacman.frame]);
          pacman.frame++;
          if (pacman.frame === 7) {
            pacman.$node.remove();
          } 
        }, 200 * i);
      }
      gameOver();
    };

    var checkCollisions = function() {
      if (score === 40) {
        //WIN
      }

      //pacman and ghosts
      for (var i = 0; i < ghosts.length; i++) {
        if (collisionDetection(pacman, ghosts[i])) {
            //make pacman die
          // pacman.vx = 0;
          // pacman.vy = 0;
          if (ghosts[i].vulnerable) {
            ghosts[i].$node.remove();
            score += 10;
          } else {
            death();
            break;
          }
        }
      }
      if (!pacman.dead) {
        setTimeout(checkCollisions, 10);
      }

      //powerPellet collision check
      for (var i = 0; i < pellets.length; i++) {
        if (collisionDetection(pacman, pellets[i])) {
          for (var j = 0; j < ghosts.length; j++) {
            ghosts[j].makeVulnerable();
            pellets[i].$node.remove();
          }
        }
      }

      //ghosts and other ghosts
      for (var i = 0; i < ghosts.length; i++) {
        for (var j = 0; j < ghosts.length; j++) {
          if (i !== j) {
            if (collisionDetection(ghosts[i], ghosts[j])) {
              var newVx = Math.floor(Math.random() * 15);
              var newVy = Math.floor(Math.random() * 30);
              ghosts[i].vx = newVx;
              ghosts[i].vy = newVy;
              ghosts[i].stepCount = 1;
              ghosts[j].vx = -1 * newVx;
              ghosts[j].vy = -1 * newVy;
              ghosts[j].stepCount = 1;
            }
          }
        }
      }
    };

    checkCollisions();

    setInterval(function() { 
      if (!pacman.dead) {
        var powerPellet = new makeBlinkyDancer(
          $('body').height() * Math.random(),
          $('body').width() * Math.random(),
            500
          );
        $('body').append(powerPellet.$node);
        pellets.push(powerPellet);        
      }
    }, 2000);
  });
});

