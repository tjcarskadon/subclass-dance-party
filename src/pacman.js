var makePacman = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, 150);
  
  // variable to keep track of animation frame
  this.$node = $('<img class="pacman" src="img/pManWide.png">');
  this.setPosition(top, left);
  this.frame = 0;
  // this.startFlag = true;
  // this.speed = 70;
  this.driftCorrection = 2.75;
  this.dead = false;
  this.frames = ['img/pManWide.png', 'img/pManMiddle.png', 'img/pManClosed.png'];
  this.deathFrames = ['img/dyingF0.png', 'img/dyingF1.png', 'img/dyingF2.png', 'img/dyingF3.png', 'img/dyingF4.png', 'img/dyingF5.png', 'img/dyingF6.png', 'img/dyingF7.png', ];
};

makePacman.prototype = Object.create(makeDancer.prototype);
makePacman.prototype.constructor = makePacman;

makePacman.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  
  var pacmanNode = this.$node;
  var frames = ['img/pManWide.png', 'img/pManMiddle.png', 'img/pManClosed.png'];
  //animate mouth
  this.frame = this.frame > frames.length - 1 ? 0 : this.frame + 1; pacmanNode.attr('src', frames[this.frame]);
  // this.x = pacmanNode.offset().left;
  // this.y = pacmanNode.offset().top;
  
  //manage start position for pacman
  if (this.startFlag) {
    if (this.x < $('body').width() * .6) {
      this.vx = 0;
      this.vy = 0;
      this.startFlag = false;
    }
  }
  
//   //boundry detectoin
//   if (this.x <= 0) {
//     //left boundry
//     this.vx = this.speed;
//     this.vy = 0;
//     pacmanNode.css({transform: 'rotate(0deg)'});
//   } else if (this.x >= $('body').width() - 50 && !this.startFlag) {
//     //right boundry
//     this.vx = this.speed * -1;
//     this.vy = 0;
//     this.$node.css({transform: 'rotate(180deg)'});
//   } else if (this.y <= 0) {
//     //top boundry
//     this.vx = this.driftCorrection;
//     this.vy = this.speed;
//     this.$node.css({transform: 'rotate(90deg)'});
//   } else if (this.y >= $('body').height() - 50) {
//     //bottom boundry
//     this.vx = this.driftCorrection;
//     this.vy = this.speed * -1;
//     this.$node.css({transform: 'rotate(-90deg)'});
//   }
//   console.log(this.vx);
//   console.log(this.vy);

// //constant motion 
//   this.$node.animate({
//     left: this.x + this.vx,
//     top: this.y + this.vy
//   }, 100);

};
