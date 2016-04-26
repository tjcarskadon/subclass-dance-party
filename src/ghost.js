makeGhost = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  
  // variable to keep track of animation frame
  this.frame = 0;
  this.$node = $('<span class="ghost"></span>');
  this.setPosition(top, left);
};

makeGhost.prototype = Object.create(makeDancer.prototype);
makeGhost.prototype.constructor = makeBlueDancer;

makeGhost.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  
  //this.$node.toggle();
};
