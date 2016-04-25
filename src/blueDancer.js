var makeBlueDancer = function (top, left, timeBetweenSteps) {
  makeBlinkyDancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class="blue"></span>');
  this.setPosition(top, left);
};

makeBlueDancer.prototype = Object.create(makeBlinkyDancer.prototype);
makeBlueDancer.prototype.constructor = makeBlueDancer;


