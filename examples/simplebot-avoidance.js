// =======================
// Build off the basic simplebot for avoidance
//
// =======================
var five = require("johnny-five");

var STOPVAL = 90;
var RSTOPVAL = 90;
var LSTOPVAL = 90;

var board = new five.Board(opts);

board.on("ready", function() {

  var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' }).to(LSTOPVAL);
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).to(RSTOPVAL);

  //Create new Ping and show distance on change
  var ping = new five.Ping(7);
  console.log('Initialising Range Finder');

  ping.on("change", function( err, value ) {

    if (this.cm < 10) {
      console.log('WARNING: Collision avoidance activated at: ' + this.cm + ' cm away');
      left_wheel.to(LSTOPVAL);
      right_wheel.to(RSTOPVAL);
    }

  });
});