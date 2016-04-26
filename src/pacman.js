var makePacman = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, 150);
  
  // variable to keep track of animation frame
  this.$node = $('<img class="pacman" src="img/pManWide.png">');
  this.setPosition(top, left);
  this.frame = 0;
};

makePacman.prototype = Object.create(makeDancer.prototype);
makePacman.prototype.constructor = makePacman;

makePacman.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  var frames = ['img/pManWide.png', 'img/pManMiddle.png', 'img/pManClosed.png'];
  this.frame = this.frame > frames.length - 1 ? 0 : this.frame + 1;
  this.$node.attr('src', frames[this.frame]);
  //this.$node.toggle();
};

