'use strict';

var pow = Math.pow;
var sin = Math.sin;
var PI = Math.PI;
var BACK_CONST = 1.70158;

/**
 * @class pillow.Tween Tween.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

var Tween = {
  swing: function(t) {
    return -Math.cos(t * PI) / 2 + 0.5;
  },
  easeNone: function(t) {
    return t;
  },
  easeIn: function(t) {
    return t * t;
  },
  easeOut: function(t) {
    return (2 - t) * t;
  },
  easeBoth: function(t) {
    return (t *= 2) < 1 ?
      0.5 * t * t :
      0.5 * (1 - --t * (t - 2));
  },
  easeInStrong: function(t) {
    return t * t * t * t;
  },
  easeOutStrong: function(t) {
    return 1 - --t * t * t * t;
  },
  easeBothStrong: function(t) {
    return (t *= 2) < 1 ?
      0.5 * t * t * t * t :
      0.5 * (2 - (t -= 2) * t * t * t);
  },
  easeInSine: function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  elasticIn: function(t) {
    var p = 0.3;
    var s = p / 4;
    if (t === 0 || t === 1) return t;
    return -(pow(2, 10 * (t -= 1)) * sin((t - s) * (2 * PI) / p));
  },
  elasticOut: function(t) {
    var p = 0.3;
    var s = p / 4;
    if (t === 0 || t === 1) return t;
    return pow(2, -10 * t) * sin((t - s) * (2 * PI) / p) + 1;
  },
  elasticBoth: function(t) {
    var p = 0.45;
    var s = p / 4;
    if (t === 0 || (t *= 2) === 2) return t;
    if (t < 1) {
      return -0.5 * (pow(2, 10 * (t -= 1)) *
        sin((t - s) * (2 * PI) / p));
    }
    return pow(2, -10 * (t -= 1)) *
      sin((t - s) * (2 * PI) / p) * 0.5 + 1;
  },
  backIn: function(t) {
    if (t === 1) t -= 0.001;
    return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
  },
  backOut: function(t) {
    return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
  },
  backBoth: function(t) {
    if ((t *= 2) < 1) {
      return 0.5 * (t * t * (((BACK_CONST *= 1.525) + 1) * t - BACK_CONST));
    }
    return 0.5 * ((t -= 2) * t * (((BACK_CONST *= 1.525) + 1) * t + BACK_CONST) + 2);
  },
  bounceIn: function(t) {
    return 1 - Tween.bounceOut(1 - t);
  },
  bounceOut: function(t) {
    var s = 7.5625;
    var r;
    if (t < 1 / 2.75) {
      r = s * t * t;
    } else if (t < 2 / 2.75) {
      r = s * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      r = s * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      r = s * (t -= 2.625 / 2.75) * t + 0.984375;
    }
    return r;
  }
};

module.exports = Tween;
