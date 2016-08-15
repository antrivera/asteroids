const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

function Asteroid(options) {
  this.COLOR = 'red';
  this.RADIUS = 20;

  options.color = this.COLOR;
  options.radius = this.RADIUS;
  options.vel = Util.randomVec(Math.random() * 5);

  // super(options);
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
