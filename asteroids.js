const MovingObject = require('./lib/moving_object.js');
const Util = require('./lib/util.js');
const Asteroid = require('./lib/asteroid.js');
const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');
const Ship = require('./lib/ship.js');

window.Util = Util;
window.MovingObject = MovingObject;
window.Asteroid = Asteroid;
window.Game = Game;
window.GameView = GameView;
window.Ship = Ship;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  let c = canvas.getContext("2d");
  let game = new Game();
  let gv = new GameView(game, c);
  gv.start();
});
