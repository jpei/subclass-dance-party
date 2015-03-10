var PrancerDancer = function(top, left, timeBetweenSteps){
  Dancer.apply(this, arguments);
  this.stepDistance = Math.random()*50;
  this.stepCount = Math.floor(Math.random()*4);
};

PrancerDancer.prototype = Object.create(Dancer.prototype);
PrancerDancer.prototype.constructor = PrancerDancer;
PrancerDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  if (Math.floor(this.stepCount)===0) {
  	this.$node.animate({'top':(this.top+this.stepDistance)+'px'},this.timeBetweenSteps);
  }
  if (Math.floor(this.stepCount)===1) {
  	this.$node.animate({'left':(this.left+this.stepDistance)+'px'},this.timeBetweenSteps);
  }
  if (Math.floor(this.stepCount)===2) {
  	this.$node.animate({'top':(this.top-this.stepDistance)+'px'},this.timeBetweenSteps);
  }
  if (Math.floor(this.stepCount)===3) {
  	this.$node.animate({'left':(this.left-this.stepDistance)+'px'},this.timeBetweenSteps);
  }
  this.stepCount = (this.stepCount+1)%4;
}
PrancerDancer.prototype.lineUp = function() {
	this.$node.stop(true);
	this.$node.animate({'top':$("body").height()/2},5000);
	this.top = $("body").height()/2;
}

var makePrancerDancer = function(top, left, timeBetweenSteps){
  return new PrancerDancer(top, left, timeBetweenSteps);
}

var makeManyPrancerDancer = function(top, left, timeBetweenSteps){
  var onePrancerDancer = new PrancerDancer(top, left, timeBetweenSteps); 
  onePrancerDancer.makeManyDancers();
  return onePrancerDancer;
}