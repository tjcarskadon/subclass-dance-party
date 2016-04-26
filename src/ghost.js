makeGhost = function (top, left, timeBetweenSteps, imgTag) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  
  // variable to keep track of animation frame
  this.frame = 0;
  this.imgTag = imgTag;
  this.$node = $('<img class="ghost" src=' + '"' + imgTag + '"' + '>');
  this.setPosition(top, left);
};

makeGhost.prototype = Object.create(makeDancer.prototype);
makeGhost.prototype.constructor = makeBlueDancer;

makeGhost.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  
  //this.$node.toggle();
};
