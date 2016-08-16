const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Ship(options) {
  this.RADIUS = 10;
  this.COLOR = 'purple';

  options.radius = this.RADIUS;
  options.color = this.COLOR;
  options.vel = [0, 0];

  MovingObject.call(this, options);
}

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
};

Util.inherits(Ship, MovingObject);

module.exports = Ship;
