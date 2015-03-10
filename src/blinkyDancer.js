var BlinkyDancer = function(top, left, timeBetweenSteps){
  Dancer.apply(this, arguments);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.toggle();
};

var makeBlinkyDancer = function(top, left, timeBetweenSteps){
  return new BlinkyDancer(top, left, timeBetweenSteps);
};

var makeManyBlinkyDancer = function(top, left, timeBetweenSteps){
  var oneBlinkyDancer = new BlinkyDancer(top, left, timeBetweenSteps); 
  oneBlinkyDancer.makeManyDancers();
  return oneBlinkyDancer;
};