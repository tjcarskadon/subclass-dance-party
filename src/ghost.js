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
  this.vulnerable = false;
};

makeGhost.prototype = Object.create(makeDancer.prototype);
makeGhost.prototype.constructor = makeBlueDancer;

makeGhost.prototype.step = function() {
  makeDancer.prototype.step.call(this);

  if (this.vulnerable) {
    if (this.frame % 2 === 0) {
      this.$node.attr('src', 'img/vGhostWhite.png');  
    } else {
      this.$node.attr('src', 'img/vGhostBlue.png');  
    }
    this.frame++;
  }

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

makeGhost.prototype.makeVulnerable = function() {
  this.$node.attr('src', 'img/vGhostWhite.png');
  this.vulnerable = true;
  setTimeout(function() {
    this.vulnerable = false;
    this.$node.attr('src', this.imgTag);
  }.bind(this), 10000);
};