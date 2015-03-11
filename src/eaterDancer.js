var EaterDancer = function(top, left, timeBetweenSteps){
  this.direction = Math.random() * Math.PI * 2;
  this.stepDistance = 30;
  this.stepX = Math.cos(this.direction) * this.stepDistance;
  this.stepY = Math.sin(this.direction) * this.stepDistance;
  window.eaters.push(this);
  this.borderRadius = 20;
  Dancer.apply(this, [top, left, 300 + timeBetweenSteps%500]);

  this.$node.css(
  	{'width': 0,
     'height': 0,
     'border-right': this.borderRadius + 'px solid transparent',
     'border-top': this.borderRadius + 'px solid',
     'border-left': this.borderRadius + 'px solid',
     'border-bottom': this.borderRadius + 'px solid',
     'border-top-left-radius': $('body').width() + 'px',
     'border-top-right-radius': $('body').width() + 'px',
     'border-bottom-left-radius': $('body').width() + 'px',
     'border-bottom-right-radius': $('body').width() + 'px',
     'z-index': 1,
     'color': 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')',
     '-webkit-transform' : 'rotate('+ (this.direction) +'rad)',
     '-moz-transform' : 'rotate('+ (this.direction) +'rad)',
     '-ms-transform' : 'rotate('+ (this.direction) +'rad)',
     'transform' : 'rotate('+ (this.direction) +'rad)'
  });
};

EaterDancer.prototype = Object.create(Dancer.prototype);
EaterDancer.prototype.constructor = EaterDancer;
EaterDancer.prototype.step = function() {
  if (this.exists) {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
    this.$node.stop(true);
    this.$node.animate({
      'top': (this.top + this.stepY) + 'px',
      'left': (this.left + this.stepX) + 'px'
    }, this.timeBetweenSteps);

    this.top += this.stepY;
    this.left += this.stepX;

    if (this.top < 0 && this.stepY < 0) {
      this.stepY *= -1;
      setTimeout(this.rotate.bind(this),this.timeBetweenSteps);
    } else if (this.left < 0 && this.stepX < 0) {
      this.stepX *= -1;
      setTimeout(this.rotate.bind(this),this.timeBetweenSteps);
    } else if (this.top + this.borderRadius*2> $("body").height() && this.stepY > 0) {
      this.stepY *= -1;
      setTimeout(this.rotate.bind(this),this.timeBetweenSteps);
    } else if (this.left + this.borderRadius*2> $("body").width() && this.stepX > 0) {
      this.stepX *= -1;
      setTimeout(this.rotate.bind(this),this.timeBetweenSteps);
    }
  }
};

var makeEaterDancer = function(top, left, timeBetweenSteps){
  return new EaterDancer(top, left, timeBetweenSteps);
};

EaterDancer.prototype.lineUp = function() {};

EaterDancer.prototype.collide = function() {
  this.borderRadius = Math.sqrt(Math.pow(this.borderRadius,2) + .5*Math.pow(10,2)); 
  this.$node.css({"border-width": this.borderRadius + "px"});
  this.$node.css({'border-right': this.borderRadius + 'px solid'});
  setTimeout(this.$node.css.bind(this.$node, {'border-right': this.borderRadius + 'px solid transparent'}), this.timeBetweenSteps/4);
};

EaterDancer.prototype.rotate = function() {
  if (this.stepX > 0 && this.stepY > 0)
    this.direction = Math.asin(this.stepY/this.stepDistance);
  if (this.stepX < 0 && this.stepY > 0)
    this.direction = Math.PI - Math.asin(this.stepY/this.stepDistance);
  if (this.stepX < 0 && this.stepY < 0)
    this.direction = Math.PI - Math.asin(this.stepY/this.stepDistance);
  if (this.stepX > 0 && this.stepY < 0)
    this.direction = 2 * Math.PI + Math.asin(this.stepY/this.stepDistance);
  this.$node.css({
    '-webkit-transform' : 'rotate('+ (this.direction) +'rad)',
    '-moz-transform' : 'rotate('+ (this.direction) +'rad)',
    '-ms-transform' : 'rotate('+ (this.direction) +'rad)',
    'transform' : 'rotate('+ (this.direction) +'rad)'
  });
}