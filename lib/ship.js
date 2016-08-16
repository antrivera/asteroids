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

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;
