const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

function Game() {
  this.DIM_X = 900;
  this.DIM_Y = 900;
  this.NUM_ASTEROIDS = 0;
  this.asteroids = [];
  this.bullets = [];
  this.ship = new Ship({ pos: this.randomPosition(), game: this });

  this.addAsteroids();
}

Game.prototype.randomPosition = function() {
  let x = Math.random() * this.DIM_X;
  let y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.allObjects().forEach(obj => {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(obj => {
    obj.move();
  });
};

Game.prototype.wrap = function(pos) {
  let wrappedPos = [pos[0] % this.DIM_X, pos[1] % this.DIM_Y];
  return wrappedPos;
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach(obj => {
    this.allObjects().forEach(otherObj => {
      if (obj === otherObj) {
        return;
      }

      if (obj.isCollidedWith(otherObj)) {
        obj.collideWith(otherObj);
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    let idx = this.asteroids.indexOf(object);
    this.asteroids.splice(idx, 1);
  } else {
    let idx = this.bullets.indexOf(object);
    this.bullets.splice(idx, 1);
  }
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship, this.bullets);
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] < 0 || pos[0] > this.DIM_X || pos[1] < 0 || pos[1] > this.DIM_Y) {
    return true;
  }

  return false;
};

module.exports = Game;
