makeGhost = function (top, left, timeBetweenSteps, imgTag) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  
  // variable to keep track of animation frame
  this.frame = 0;
  this.imgTag = imgTag;
  this.$node = $('<img class="ghost" src=' + '"' + imgTag + '"' + '>');
  this.setPosition(top, left);
  this.stepCount = 0;
  this.speed = 90;
  this.startPosition;
};

makeGhost.prototype = Object.create(makeDancer.prototype);
makeGhost.prototype.constructor = makeBlueDancer;

makeGhost.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  //manage start position for pacman
  if (this.startFlag) {
    if (this.x > this.startPosition) {
      this.vx = 0;
      this.vy = 0;
      this.startFlag = false;
    }
  } else {
    if (this.stepCount % 5 === 0 || !this.stepCount) {
      this.vx = Math.floor(Math.random() * this.speed * 2) - this.speed;
      this.vy = Math.floor(Math.random() * this.speed * 2) - this.speed;
    }
    this.stepCount++;  
  }
};
