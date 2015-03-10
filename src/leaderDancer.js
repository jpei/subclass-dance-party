var LeaderDancer = function(top, left, timeBetweenSteps){
  this.direction = Math.random() * Math.PI * 2;
  this.stepDistance = 30;
  this.stepX = Math.cos(this.direction) * this.stepDistance;
  this.stepY = -Math.sin(this.direction) * this.stepDistance;
  window.leaderNumber++;
  this.leaderNumber = window.leaderNumber;
  Dancer.apply(this, arguments);
  this.$node.css(
  	{'border-width': 20 + 'px',
     'border-radius': 50 + 'px'
  });
};

LeaderDancer.prototype = Object.create(Dancer.prototype);
LeaderDancer.prototype.constructor = LeaderDancer;
LeaderDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  this.$node.animate({
  	'top': (this.top + this.stepY) + 'px',
  	'left': (this.left + this.stepX) + 'px'
  }, this.timeBetweenSteps);

  this.top += this.stepY;
  this.left += this.stepX;

  if (this.top < 0 && this.stepY < 0) {
  	this.stepY *= -1;
  } else if (this.left < 0 && this.stepX < 0) {
  	this.stepX *= -1;
  } else if (this.top > $("body").height() && this.stepY > 0) {
  	this.stepY *= -1;
  } else if (this.left > $("body").width() && this.stepX > 0) {
  	this.stepX *= -1;
  }
};

var makeLeaderDancer = function(top, left, timeBetweenSteps){
  return new LeaderDancer(top, left, timeBetweenSteps);
};

LeaderDancer.prototype.lineUp = function() {
};