const Game = require('./game.js');
const assignKey = require('../keymaster.js');


function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
  this.bindKeyHandlers();
};

GameView.prototype.bindKeyHandlers = function () {
  assignKey('w', () => this.game.ship.power([0, -5]));
  assignKey('a', () => this.game.ship.power([-5, 0]));
  assignKey('s', () => this.game.ship.power([0, 5]));
  assignKey('d', () => this.game.ship.power([5, 0]));
  assignKey('f', () => this.game.ship.fireBullet());
};

module.exports = GameView;
