// =======================
// Derived from the work done by @makenai on the
// SumoBot Jr
// =======================

var five = require("johnny-five");
var keypress = require('keypress');

var STOPVAL = 90;
var RSTOPVAL = 94;
var LSTOPVAL = 95;

var port = process.argv[2] || "";

var opts = {};

if (port != "") {
  opts.port = port;
}

keypress(process.stdin);

var board = new five.Board(opts);
//var board = new five.Board({port: "/dev/tty.FireFly-AF8A-SPP" });

board.on("ready", function() {

  console.log("Welcome to SimpleBot!")
  console.log("Control the bot with the arrow keys, and SPACE to stop.")

  var led = new five.Led(5);
  var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' }).to(LSTOPVAL);
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).to(RSTOPVAL);

  //Create new Ping and show distance on ch  ange
  var ping = new five.Ping(7);
  console.log('Initialising Range Finder');
  ping.on("change", function( err, value ) {

    if (this.cm < 10) {
      console.log('WARNING: Collision avoidance activated at : ' + this.cm + ' cm away');
      left_wheel.to(LSTOPVAL);
      right_wheel.to(RSTOPVAL);
    }
  });

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', function (ch, key) {

    if ( !key ) return;

    if ( key.name == 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name == 'up' ) {

      console.log('Forward');
      left_wheel.ccw();
      right_wheel.cw();

    } else if ( key.name == 'down' ) {

      console.log('Backward');
      left_wheel.cw();
      right_wheel.ccw();

    } else if ( key.name == 'left' ) {

      console.log('Left');
      left_wheel.cw();
      right_wheel.cw();

    } else if ( key.name == 'right' ) {

      console.log('Right');
      left_wheel.ccw();
      right_wheel.ccw();

    } else if ( key.name == 'space' ) {

      console.log('Stopping');
      left_wheel.to(LSTOPVAL);
      right_wheel.to(RSTOPVAL);

    } else if (key.name == "o") {
      console.log("on");
      led.on();
    } else if (key.name == "f") {
      console.log("off");
      led.off();
    } else if (key.name == "s") {
      console.log("blink");
      led.strobe(2000);
    }
  });
});

board.on("error", function(err) {
  console.log(err.message);
  process.exit();
});

