'use strict';

const _ = require('../../tool/Util');
const RenderObjectModel = require('../RenderObjectModel');

/**
 * @class pillow.Screen Screen.
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

function Screen(cfg) {
  var that = this;
  Screen.sup.call(that, cfg);
  _.merge(that, cfg);
  that.init();
}

var proto = {
  init: function() {
    var that = this;
    that.target = that.container;
    if (that.target) {
      that.context = that.target.getContext('2d');
      that.canvas = that.context.canvas;
      that.canvas.width = that.width || that.canvas.width;
      that.canvas.height = that.height || that.canvas.height;
    } else {
      console.log('init error');
      return;
    }
  },
  run: function() {
    var that = this;
    this.render(that.context);
  },
  hitTest: function() {
    return true;
  }
};

_.augment(Screen, proto);
_.inherit(Screen, RenderObjectModel);

module.exports = Screen;
