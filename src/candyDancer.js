var CandyDancer = function(top, left, timeBetweenSteps){
  Dancer.apply(this, arguments);
};

CandyDancer.prototype = Object.create(Dancer.prototype);
CandyDancer.prototype.constructor = CandyDancer;
CandyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.css({'border-color':'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')'});
};

var makeCandyDancer = function(top, left, timeBetweenSteps){
  return new CandyDancer(top, left, timeBetweenSteps);
};

var makeManyCandyDancer = function(top, left, timeBetweenSteps){
  var oneCandyDancer = new CandyDancer(top, left, timeBetweenSteps); 
  oneCandyDancer.makeManyDancers();
  return oneCandyDancer;
};