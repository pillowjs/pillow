'use strict';

const Img = require('./Img');
const _ = require('../../tool/Util');

/**
 * @class pillow.Sprite Sprite.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>x</tt></li>
 * <li><tt>y</tt></li>
 * <li><tt>width</tt></li>
 * <li><tt>height</tt></li>
 * <li><tt>alpha</tt></li>
 * <li><tt>scaleX</tt></li>
 * <li><tt>scaleY</tt></li>
 * <li><tt>rotation</tt></li>
 * <li><tt>angle</tt></li>
 * <li><tt>visible</tt></li>
 * <li><tt>debug</tt></li>
 */

function Sprite(cfg) {
  var that = this;
  that.frame = 0;
  that.paused = false;
  that.loop = true;
  that.offset = {
    x: 0,
    y: 0
  };
  Sprite.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}

var proto = {
  init: function() {
    var that = this;
    that.xs = that.size.width / that.width;
    that.ys = that.size.height / that.height;
  },
  pause: function() {
    var that = this;
    that.paused = true;
  },
  play: function() {
    var that = this;
    that.paused = false;
  },
  next: function() {
    var that = this;
    !that.paused && that.frame++;
  },
  prev: function() {
    var that = this;
    !that.paused && !!that.frame && that.frame--;
  },
  to: function(index) {
    var that = this;
    that.frame = that.paused ? that.frame : index;
  },
  getCurrentFrame: function() {
    var that = this;
    var x = that.frame % that.xs;
    var y = parseInt(that.frame / that.xs, 10) % that.ys;

    if (!x && y === that.ys) {
      if (that.loop) {
        that.frame = 0;
      } else {
        that.paused = true;
      }
    }
    return {
      x: x * that.width + that.offset.x,
      y: y * that.height + that.offset.y
    };
  },
  hitTest: function() {
    return true;
  }
};

_.augment(Sprite, proto);
_.inherit(Sprite, Img);

module.exports = Sprite;
