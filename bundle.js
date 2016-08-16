/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(2);
	const Asteroid = __webpack_require__(3);
	const Game = __webpack_require__(4);
	const GameView = __webpack_require__(5);
	const Ship = __webpack_require__(6);

	window.Util = Util;
	window.MovingObject = MovingObject;
	window.Asteroid = Asteroid;
	window.Game = Game;
	window.GameView = GameView;

	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById('game-canvas');
	  let c = canvas.getContext("2d");
	  let game = new Game();
	  let gv = new GameView(game, c);
	  gv.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  this.pos = this.game.wrap(this.pos);
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

	module.exports = MovingObject;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    let Surrogate = function() {};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  randomVec(length) {
	    let x = Math.random() * length;
	    let y = Math.sqrt(Math.pow(length, 2) - Math.pow(x,2));
	    return [x, y];
	  }
	};

	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(2);
	const Ship = __webpack_require__(6);

	function Asteroid(options) {
	  this.COLOR = Asteroid.randomColor();
	  this.RADIUS = 15 + Math.random() * 20;

	  options.color = this.COLOR;
	  options.radius = this.RADIUS;
	  options.vel = Util.randomVec(Math.random() * 5);

	  // super(options);
	  MovingObject.call(this, options);
	}

	const HEX_DIGITS = "0123456789ABCDEF";

	Asteroid.randomColor = function () {
	  let color = "#";
	  for (let i = 0; i < 6; i++) {
	    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
	  }

	  return color;
	};

	Asteroid.prototype.collideWith = function (otherObject) {
	  if (otherObject instanceof Ship) {
	    otherObject.relocate();
	  }
	};

	Util.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);

	function Game() {
	  this.DIM_X = 900;
	  this.DIM_Y = 900;
	  this.NUM_ASTEROIDS = 1;
	  this.asteroids = [];
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

	Game.prototype.remove = function (asteroid) {
	  let idx = this.asteroids.indexOf(asteroid);
	  this.asteroids.splice(idx, 1);
	};

	Game.prototype.allObjects = function () {
	  return this.asteroids.concat(this.ship);
	};

	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(4);


	function GameView(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  setInterval(() => {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const MovingObject = __webpack_require__(1);

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


/***/ }
/******/ ]);