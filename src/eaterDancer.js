var EaterDancer = function(top, left, timeBetweenSteps){
  this.direction = Math.random() * Math.PI * 2;
  this.stepDistance = 30;
  this.stepX = Math.cos(this.direction) * this.stepDistance;
  this.stepY = -Math.sin(this.direction) * this.stepDistance;
  window.eaters.push(this);
  this.borderWidth = 20;
  Dancer.apply(this, [top, left, 300 + timeBetweenSteps%500]);

  this.$node.css(
  	{'border-width': this.borderWidth + 'px',
     'border-radius': $('body').width() + 'px',
     'z-index': 1,
  });
};

EaterDancer.prototype = Object.create(Dancer.prototype);
EaterDancer.prototype.constructor = EaterDancer;
EaterDancer.prototype.step = function() {
  if (this.exists) {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
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
    } else if (this.top + this.borderWidth*2> $("body").height() && this.stepY > 0) {
      this.stepY *= -1;
    } else if (this.left + this.borderWidth*2> $("body").width() && this.stepX > 0) {
      this.stepX *= -1;
    }
  }
};

var makeEaterDancer = function(top, left, timeBetweenSteps){
  return new EaterDancer(top, left, timeBetweenSteps);
};

EaterDancer.prototype.lineUp = function() {};

EaterDancer.prototype.collide = function() {
  this.borderWidth = Math.sqrt(Math.pow(this.borderWidth,2) + .5*Math.pow(10,2)); 
  this.$node.css({"border-width": this.borderWidth + "px"});
};