var makeflippyDancer = function (top, left, timeBetweenSteps) {
  makeBlinkyDancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class="triangle"></span>');
  this.setPosition(top, left);
};

makeflippyDancer.prototype = Object.create(makeDancer.prototype);
makeflippyDancer.prototype.constructor = makeflippyDancer; 

makeflippyDancer.prototype.solo = function () {
  if ($(this).hasClass('solo')) {
    this.$node.animate({
      
    }, 500);
  }
}