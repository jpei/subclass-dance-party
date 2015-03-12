$(document).ready(function(){
  window.dancers = [];
  window.eaters = [];
  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = dancerMakerFunction(
      ($("body").height()-20-32) * Math.random()+32, // Spawn fully on screen without covering top bar
      ($("body").width()-20-32) * Math.random()+32,
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $('body').on("click", '.dancer', function(){
    this.parent.die();
  });

  $('.getThePartyStarted').on('click', function(event) {
    buildEcosystem();
  });

  $(".lineUp").on("click", function(event){
    for (var i=0; i<window.dancers.length; i++) {
      window.dancers[i].lineUp();
    }
  });

  $('.reset').on('click', function(event) {
    reset();
  });
  var reset = function() {
    for (var i=0; i<window.dancers.length; i++) {
      window.dancers[i].die();
    }
  }
  var buildEcosystem = function() {
    reset();
    var dancerType;
    var dancerMakers = ['PrancerDancer', 'BlinkyDancer', 'CandyDancer'];
    for (var i=0; i<500; i++) {
      dancerType = dancerMakers[Math.floor(dancerMakers.length*Math.random())];
      var dancerMakerFunction = window[dancerType];
      var dancer = new dancerMakerFunction(
        ($("body").height()-20-32) * Math.random()+32, // Spawn fully on screen without covering top bar
        ($("body").width()-20-32) * Math.random()+32,
        Math.random() * 1000
      );
      $('body').append(dancer.$node);
      window.dancers.push(dancer);
    }
    for (var i=0; i<10; i++) {
      var dancer = new EaterDancer(
        ($("body").height()-20-32) * Math.random()+32, // Spawn fully on screen without covering top bar
        ($("body").width()-20-32) * Math.random()+32,
        Math.random() * 1000
      );
      $('body').append(dancer.$node);
      window.dancers.push(dancer);
    }
  }
  setInterval(function(){
    for (var i=0; i<window.dancers.length; i++) {
      if (!window.dancers[i].exists) {
        window.dancers[i].parent && window.dancers[i].parent.die();
        window.dancers.splice(i,1);
        i--;
      }
    }
    for (var i=0; i<window.eaters.length; i++) {
      if (!window.eaters[i].exists) {
        window.eaters[i].parent && window.eaters[i].parent.die();
        window.eaters.splice(i,1);
        i--;
      }
    }
    for (var i=0; i<$('.dancer').length; i++) {
      if (!$('.dancer')[i].parent.exists)
        $('.dancer')[i].parent.die();
    }
    if (window.dancers.length === window.eaters.length) {
      setTimeout(function() {
        if (window.dancers.length === window.eaters.length) {
          buildEcosystem();
        }
      },10000);
    }
  },200);
});

