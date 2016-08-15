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
