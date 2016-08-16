const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Ship(options) {
  this.RADIUS = 40;
  this.COLOR = 'purple';

  options.radius = this.RADIUS;
  options.color = this.COLOR;
  options.vel = [0, 0];

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
};

module.exports = Ship;
