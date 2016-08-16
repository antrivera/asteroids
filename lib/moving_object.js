function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.isWrappable) {
    this.pos = this.game.wrap(this.pos);
  } else if (this.game.isOutOfBounds(this.pos)) {
    this.game.remove(this);
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let xDiff = this.pos[0] - otherObject.pos[0];
  let yDiff = this.pos[1] - otherObject.pos[1];
  let dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  let sumOfRadii = this.radius + otherObject.radius;

  if (dist < sumOfRadii) {
    return true;
  }

  return false;
};

MovingObject.prototype.collideWith = function (otherObject) {
};

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject;
