'use strict';

const Tween = require('./Tween');
const _ = require('../tool/Util');
const Notify = require('../notify/Notify');

var FPS = 60;
var INTERVAL = 1000 / FPS;

var setTimeoutFrame = function(callback) {
  return setTimeout(callback, INTERVAL);
};

var clearTimeoutFrame = function(tick) {
  clearTimeout(tick);
};

var requestAnimateFrame =
  window.requestAnimateFrame ||
  window.msRequestAnimateFrame ||
  window.webkitRequestAnimateFrame ||
  window.mozkitRequestAnimateFrame ||
  setTimeoutFrame;

var cancelAnimateFrame =
  window.cancelAnimateFrame ||
  window.msCancelAnimateFrame ||
  window.webkitCancelAnimateFrame ||
  window.mozCancelAnimateFrame ||
  clearTimeoutFrame;

function Frame(handle) {
  this.isRequested = false;
  this.frame;
  this.isCancel = false;
  this.callback = [];
  this.handle = handle;
}

var fproto = {
  request: function() {
    var that = this;
    if (this.isRequested) {
      return;
    }
    var args = arguments;
    this.isCancel = false;
    this.frame = requestAnimateFrame(function() {
      if (that.isCancel) {
        return;
      }
      that.handle.apply(window, args);
      that.isRequested = true;
      if (that.callback) {
        that.callback.forEach(function(callback) {
          callback && callback();
        });
      }
    });
    return this;
  },
  cancel: function() {
    if (this.frame) {
      this.isCancel = true;
      cancelAnimateFrame(this.frame);
    }
  },
  then: function(callback) {
    if (this.isRequested) {
      callback && callback();
    } else {
      this.callback.push(callback);
    }
    return this;
  },
  clone: function() {
    return new Frame(this.handle);
  }
};

_.augment(Frame, fproto);

function Animate(cfg) {
  this.duration = 1000;
  this.delay = 0;
  this.timing = Tween.easeIn;
  Animate.sup.call(this, cfg);
  _.merge(this, cfg);
  this.isPlaying = false;
  this.delayTick = 0;
  this.frameCount = this.duration / INTERVAL;
  this.framePercent = 1 / this.frameCount;
  this.frameQueue = [];
  this.frameIndex = 0;
  this.init();
}

var proto = {
  init: function() {
    var frameKeys = ['0'];
    var that = this;
    for (var i = 0; i < this.frameCount; i++) {
      var key = frameKeys[0];
      var percent = this.framePercent * i;
      if (key !== null && key <= percent * 100) {
        this.frameQueue.push(new Frame(function() {
          that.emit('frame', {
            percent: arguments[0],
            timing: arguments[1]
          });
        }));
        frameKeys.shift();
      } else if (this.frameQueue.length) {
        this.frameQueue.push(this.frameQueue[this.frameQueue.length - 1].clone());
      }
    }
  },
  start: function() {
    var that = this;
    if (this.isPlaying) {
      return;
    }
    this.isPlaying = true;

    var next = function() {
      if (!that.isPlaying) {
        return;
      }

      if (that.frameIndex === that.frameQueue.length) {
        that.isPlaying = false;
        that.emit('end');
      } else {
        var percent = that.framePercent * (that.frameIndex + 1).toFixed(10);
        that.currentFrame = that.frameQueue[that.frameIndex];
        that.currentFrame.request(percent.toFixed(10), that.timing(percent).toFixed(10));
        that.currentFrame.then(function() {
          that.frameIndex++;
          next();
        });
      }
    };

    this.delayTick = setTimeout(function() {
      that.delayTick = 0;
      next();
    }, !that.frameIndex && that.delay || 0);
    return this;
  },
  stop: function() {
    if (!this.isPlaying) {
      return;
    }
    this.isPlaying = false;

    if (this.delayTick) {
      cancelAnimateFrame(this.delayTick);
      this.delayTick = 0;
    }

    if (this.currentFrame) {
      this.currentFrame.cancel();
    }
    return this;
  }
};

_.augment(Animate, proto);
_.inherit(Animate, Notify);

Animate.requestAnimateFrame = requestAnimateFrame;
Animate.cancelAnimateFrame = cancelAnimateFrame;
Animate.Tween = Tween;

module.exports = Animate;
