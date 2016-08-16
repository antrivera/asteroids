const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

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
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet({
    vel: [this.vel[0] * 2, this.vel[1] * 2],
    pos: this.pos,
    game: this.game
  });

  console.log('firing');
  this.game.bullets.push(bullet);
  console.log(this.game.bullets);
};

module.exports = Ship;
