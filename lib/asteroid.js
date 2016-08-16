const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Ship = require('./ship.js');

function Asteroid(options) {
  this.COLOR = Asteroid.randomColor();
  this.RADIUS = 15 + Math.random() * 20;

  options.color = this.COLOR;
  options.radius = this.RADIUS;
  options.vel = Util.randomVec(Math.random() * 5);

  // super(options);
  MovingObject.call(this, options);
}

const HEX_DIGITS = "0123456789ABCDEF";

Asteroid.randomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }

  return color;
};

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
