'use strict';

/**
 * @class pillow.Math Math.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var _Math = {
  getRandom: function(min, max) {
    return Math.random() * (max - min + 1) + min;
  },
  hexToRgb: (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  degToRad: deg => (deg + 360) % 360 * (Math.PI / 180)
};

module.exports = _Math;
