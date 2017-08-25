'use strict';

const _ = require('../../tool/Util');
const RenderObjectModel = require('../RenderObjectModel');

/**
 * @class pillow.Img Img.
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

function Img(cfg) {
  var that = this;
  Img.sup.call(that, cfg);
  _.merge(that, cfg);
}

var proto = {
  draw: function() {
    var that = this;
    var currentFrame = that.getCurrentFrame ? that.getCurrentFrame() : null;
    var x = currentFrame ? currentFrame.x : that.x;
    var y = currentFrame ? currentFrame.y : that.y;
    that.context.drawImage(that.image, x, y, that.width, that.height, 0, 0, that.width, that.height);
  },
  hitTest: function(x, y) {
    var that = this;
    return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
  }
};

_.augment(Img, proto);
_.inherit(Img, RenderObjectModel);

module.exports = Img;
