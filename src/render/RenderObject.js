'use strict';

const _ = require('../tool/Util');
const Notify = require('../notify/Notify');

function RenderObject() {
  var that = this;
  RenderObject.sup.call(that);
  that.x = 0;
  that.y = 0;
  that.width = 0;
  that.height = 0;
  that.alpha = 1;
  that.scaleX = 1;
  that.scaleY = 1;
  that.rotation = 0;
  that.angle = 0;
  that.visible = true;
  that.event = true;
  that.parent = null;
  that.context = null;
  that.debug = false;
}

var proto = {
  _draw: function(context) {
    var that = this;
    if (!that.visible) {
      return;
    }
    that.context = that.context || context;
    that.update();
    that.context.save();
    that.context.globalAlpha = that.alpha;
    that.context.translate(that.x, that.y);
    that.context.rotate(that.rotation * Math.PI / 180);
    that.context.scale(that.scaleX, that.scaleY);
    that.draw();
    this._debug();
    for (var i = 0; i < that.children.length; i++) {
      that.children[i]._draw(that.context);
    }
    that.context.restore();
  },
  _debug: function(context) {
    var that = this;
    if (!that.debug) {
      return;
    }
    that.context = that.context || context;
    that.context.strokeStyle = 'red';
    that.context.strokeRect(0, 0, that.width, that.height);
  },
  draw: function() {
  },
  update: function() {
    var that = this;
    that.handle = that.handle || arguments[0];
    if (that.handle) {
      that.handle();
    }
  },
  clear: function(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
  }
};

_.augment(RenderObject, proto);
_.inherit(RenderObject, Notify);

module.exports = RenderObject;
