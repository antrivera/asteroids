const Asteroid = require('./asteroid.js');

function Game() {
  this.DIM_X = 900;
  this.DIM_Y = 900;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];

  this.addAsteroids();
}

Game.prototype.randomPosition = function() {
  let x = Math.random() * this.DIM_X;
  let y = Math.random() * this.DIM_Y;
  console.log([x, y]);
  return [x, y];
};

Game.prototype.addAsteroids = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let asteroid = new Asteroid({ pos: this.randomPosition() });
    this.asteroids.push(asteroid);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

module.exports = Game;
