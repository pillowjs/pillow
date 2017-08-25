'use strict';

const _ = require('../tool/Util');

var getOffset = function(element) {
  var x = 0;
  var y = 0;
  var offsetParent = element;

  while (offsetParent !== null && offsetParent !== document.body) {
    x += offsetParent.offsetLeft;
    y += offsetParent.offsetTop;
    offsetParent = offsetParent.offsetParent;
  }

  return {
    x: x,
    y: y
  };
};

/**
 * @class pillow.Mouse Provides methods for Mouse events.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 * <li><tt>screen</tt> : the screen.</li>
 */

function Mouse(cfg) {
  var that = this;
  that.types = 'ontouchend' in document ? [
    'touchstart',
    'touchmove',
    'touchend'
  ] : [
    'mousedown',
    'mousemove',
    'mouseup'
  ];
  that.element = document;
  _.merge(that, cfg);
  this.bind();
}

var proto = {
  bind: function() {
    var that = this;
    that.element = that.screen.target;
    that.offset = getOffset(that.element);
    _.each(that.types, function(event) {
      that.element.addEventListener(event, function(e) {
        e.preventDefault();
        var x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        var y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
        that.screen.dispatch(event, x - that.offset.x, y - that.offset.y);
      }, false);
    });
  }
};

_.augment(Mouse, proto);

module.exports = Mouse;
