'use strict';

const _ = require('../../tool/Util');
const RenderObjectModel = require('../RenderObjectModel');

/**
 * @class pillow.Graphics Graphics.
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

function Graphics(cfg) {
  var that = this;
  Graphics.sup.call(that, cfg);
  that.hitType = 'rect';
  that.strokeStyle = '#000';
  that.lineWidth = 1;
  that.fillStyle = 'transparent';
  that.query = [];
  _.merge(that, cfg);
}
var proto = {
  draw: function() {
    var that = this;
    for (var i = 0; i < that.query.length; i++) {
      var data = that.query[i];
      var action = data.action;

      if (that.context[action]) {
        var args = data.args;

        if (_.type(args) === 'array' || !args) {
          that.context[action].apply(that.context, args);
        } else {
          that.context[action] = that[action];
        }
      }
    }
  },
  push: function(action, args) {
    this.query.push({
      action: action,
      args: args ? args : null
    });
    return this;
  },
  beginPath: function() {
    this.push('beginPath');
  },
  closePath: function() {
    this.push('closePath');
  },
  rect: function(x, y, width, height) {
    var that = this;
    that.hitType = 'rect';
    that.x = x;
    that.y = y;
    that.width = width;
    that.height = height;
    that.beginPath();
    that.push('rect', [0, 0, that.width, that.height]);
    that.closePath();
    that.push('fillStyle', that.fillStyle);
    that.push('fill');
    that.push('lineWidth', that.lineWidth);
    that.push('strokeStyle', that.strokeStyle);
    that.push('stroke');
    return that;
  },
  circle: function(x, y, radius) {
    var that = this;
    that.push('moveTo', [x + radius, y + radius]);
    that.push('arc', [x + radius, y + radius, radius, 0, Math.PI * 2, false]);
    that.push('stroke');
    that.closePath();
    return that;
  },
  hitTest: function(x, y) {
    var that = this;

    if (that.hitType === 'rect') {
      return x >= that.x && x <= that.x + that.width && y >= that.y && y <= that.y + that.height;
    }
  }
};

_.augment(Graphics, proto);
_.inherit(Graphics, RenderObjectModel);

module.exports = Graphics;
