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

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.step();
  this.setPosition(top, left);
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  this.x = this.$node.offset().left;
  this.y = this.$node.offset().top;
  var classCheck = this.$node.attr('class');
  console.log(this.class);

  setTimeout(function() {
    this.step();
  }.bind(this), this.timeBetweenSteps);

  //boundry detectoin
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
    tclassCheck === 'pacman' && his.$node.css({transform: 'rotate(-90deg)'});
  }
  console.log(this.vx);
  console.log(this.vy);

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

