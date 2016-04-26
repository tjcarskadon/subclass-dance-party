var makePointyDancer = function (top, left, timeBetweenSteps) {
  makeBlinkyDancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class="triangle"></span>');
  this.setPosition(top, left);
};

makePointyDancer.prototype = Object.create(makeBlinkyDancer.prototype);
makePointyDancer.prototype.constructor = makePointyDancer; 