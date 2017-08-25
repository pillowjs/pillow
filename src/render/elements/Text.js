'use strict';

const _ = require('../../tool/Util');
const RenderObjectModel = require('../RenderObjectModel');

/**
 * @class pillow.Text Text.
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

function Text(cfg) {
  var that = this;
  Text.sup.call(that, cfg);
  that.x = 0;
  that.y = 0;
  that.text = '';
  that.font = '12px arial';
  that.color = '#000';
  _.merge(that, cfg);
}

var proto = {
  draw: function() {
    var that = this;
    that.context.fillStyle = that.color;
    that.context.font = that.font;
    that.context.fillText(that.text, that.x, that.y);
  }
};

_.augment(Text, proto);
_.inherit(Text, RenderObjectModel);

module.exports = Text;
