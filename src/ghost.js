makeGhost = function (top, left, timeBetweenSteps, imgTag) {
  makeDancer.call(this, top, left, 150);
  
  // variable to keep track of animation frame
  this.frame = 0;
  this.imgTag = imgTag;
  this.$node = $('<img class="ghost" src=' + '"' + imgTag + '"' + '>');
  this.setPosition(top, left);
  this.stepCount = 0;
};

makeGhost.prototype = Object.create(makeDancer.prototype);
makeGhost.prototype.constructor = makeBlueDancer;

makeGhost.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  if (this.stepCount % 5 === 0 || !this.stepCount) {
    this.vx = Math.floor(Math.random() * 100) - 50;
    this.vy = Math.floor(Math.random() * 100) - 50;
  }

  this.stepCount++;  
};
