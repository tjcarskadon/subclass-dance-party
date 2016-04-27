// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  // var context = this;
  this.timeBetweenSteps = timeBetweenSteps;

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.vx = 0;
  this.vy = 0;
  this.startFlag = true;
  this.speed = 70;
  this.driftCorrection = 0;
  this.dead = false;
  this.step();
  this.setPosition(top, left);
  this.collisionTargets = [];
};

// makeDancer.prototype.addTargets = function(inputTargetArray) {
//   this.collisionTargets.concat(inputTargetArray);
// };

// makeDancer.prototype.checkCollisions = function() {
//   var collisionDetection = function (obj1, obj2) {
//     var x1 = obj1.$node.offset().left;
//     var x2 = obj2.$node.offset().left;
//     var y1 = obj1.$node.offset().top;
//     var y2 = obj2.$node.offset().top;
//     var w1 = obj1.$node.width() + 3;
//     var w2 = obj2.$node.width() + 3;
//     var h1 = obj1.$node.height() + 3;
//     var h2 = obj2.$node.height() + 3;
//     if (x1 < x2 + w2 && 
//       x1 + w1 > x2 &&
//       y1 < y2 + h2 &&
//       h1 + y1 > y2) {
//       return true; 
//     } else {
//       return false;
//     }
//   };
// };

makeDancer.prototype.step = function() {

  // this.checkCollisions();

  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  this.x = this.$node.offset().left;
  this.y = this.$node.offset().top;
  var classCheck = this.$node.attr('class');
  //console.log(this.class);

  if (!this.dead) {
    setTimeout(function() {
      this.step();
    }.bind(this), this.timeBetweenSteps);
  }

  //boundry detection
  if (this.x <= 0) {
    //left boundry
    this.vx = this.speed;
    this.vy = 0;
    classCheck === 'pacman' && this.$node.css({transform: 'rotate(0deg)'});
  } else if (this.x >= $('body').width() - 50 && !this.startFlag) {
    //right boundry
    this.vx = this.speed * -1;
    this.vy = 0;
    classCheck === 'pacman' && this.$node.css({transform: 'rotate(180deg)'});
  } else if (this.y <= 0) {
    //top boundry
    this.vx = this.driftCorrection;
    this.vy = this.speed;
    classCheck === 'pacman' && this.$node.css({transform: 'rotate(90deg)'});
  } else if (this.y >= $('body').height() - 50) {
    //bottom boundry
    this.vx = this.driftCorrection;
    this.vy = this.speed * -1;
    classCheck === 'pacman' && this.$node.css({transform: 'rotate(-90deg)'});
  }
  // console.log(this.vx);
  // console.log(this.vy);

//constant motion 
  this.$node.animate({
    left: this.x + this.vx,
    top: this.y + this.vy
  }, 100);
};

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};



