// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  // uses jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  //initialized
  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.leader = null;

  //random color, random location
  this.$node.css({'border-color':'rgb('+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+','+
    Math.floor(Math.random()*256)+')'});
  this.setPosition(top, left);
  this.step();
};

Dancer.prototype.step = function(){

  // schedules the next step
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left){
  // Uses css top and left properties to position our <span> tag
  
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.makeManyDancers = function() {
  for (var i=0; i<9; i++) {
    var dancer = new this.__proto__.constructor(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  }
};

Dancer.prototype.lineUp = function() {
  this.$node.animate({top:$("body").height()/2}, 5000);
};