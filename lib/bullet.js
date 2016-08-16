const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Asteroid = require('./asteroid.js');

function Bullet (options) {
  this.color = 'red';
  this.radius = 10;

  options.color = this.color;
  options.radius = this.radius;

  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (object) {
  if (this.isCollidedWith(object)) {
    if (object instanceof this.game.ship.constructor) {
      return;
    }

    this.game.remove(object);
    this.game.remove(this);
  }
};

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
