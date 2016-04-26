var makeBlueDancer = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class="blue"></span>');
  this.setPosition(top, left);
};

makeBlueDancer.prototype = Object.create(makeDancer.prototype);
makeBlueDancer.prototype.constructor = makeBlueDancer;


