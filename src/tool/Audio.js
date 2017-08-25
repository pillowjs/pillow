/* global webkitAudioContext */
/* eslint new-cap: ["error", { "newIsCapExceptions": ["webkitAudioContext"] }] */

'use strict';

const _ = require('../tool/Util');

var Base = {
  isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
  cache: {},
  context: null,
  masterGain: null,
  isSupported: () => {
    return typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined';
  },
  getContext: () => {
    if (!Base.isSupported()) {
      return null;
    }
    if (Base.context) {
      return Base.context;
    }
    if (typeof AudioContext !== 'undefined') {
      Base.context = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      Base.context = new webkitAudioContext();
    }
    return Base.context;
  },
  enableIOS: () => {
    if (!Base.isIOS) {
      return;
    }
    var unlock = () => {
      var context = Base.getContext();
      var source = context.createBufferSource();
      source.buffer = context.createBuffer(1, 1, 22050);;
      source.connect(context.destination);
      source.start(0);
      context.resume();
      source.onended = () => {
        source.disconnect(0);
        document.removeEventListener('touchstart', unlock, true);
      };
    };
    document.addEventListener('touchstart', unlock, true);
  }
};

function WebAudio() {
  this.paused = null;
  this.ended = null;
  this.guid = null;
  this.node = null;
  this.init();
}

var wproto = {
  init: function() {
    this.paused = true;
    this.guid = _.guid();
    this.node = null;
    this.create();
  },

  create: function() {
    var context = Base.getContext();
    this.node = context.createGain();
    this.node.gain.setValueAtTime(1, context.currentTime);
    this.node.paused = true;
    this.node.connect(Base.masterGain);
  },

  reset: function() {
    this.guid = _.guid();
  }
};

_.augment(WebAudio, wproto);

var _refreshBuffer = function(audio, src) {
  audio.node.bufferSource = Base.getContext().createBufferSource();
  audio.node.bufferSource.buffer = Base.cache[src];
  audio.node.bufferSource.connect(audio.node);
  audio.node.bufferSource.playbackRate.value = 1;
  audio.node.bufferSource.loop = false;
};

var _handleQueue = function(limit, queue) {
  var count = 0;

  if (queue.length < limit) {
    return;
  }

  for (let i = 0; i < queue.length; i++) {
    if (queue[i].ended) {
      count++;
    }
  }

  for (let i = queue.length - 1; i >= 0; i--) {
    if (count <= limit) {
      return;
    }

    if (queue[i].ended) {
      if (queue[i].node) {
        queue[i].node.disconnect(0);
      }
      queue.splice(i, 1);
      count--;
    }
  }

  for (let i = 0; i < queue.length; i++) {
    if (queue[i].ended) {
      return queue[i].reset();
    }
  }
};

var _initAudio = function() {
  if (!Base.isSupported()) {
    return;
  }

  var context = Base.getContext();
  Base.masterGain = context.createGain();
  Base.masterGain.gain.value = 1;
  Base.masterGain.connect(context.destination);

  var audio = new WebAudio();
  this.queue.push(audio);

  if (Base.cache[this.src]) {
    this.duration = Base.cache[this.src].duration;
    this.state = 'loaded';
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.src, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = () => {
    if (xhr.status === 200) {
      context.decodeAudioData(xhr.response, buffer => {
        if (buffer && this.queue.length > 0) {
          Base.cache[this.src] = buffer;
          if (buffer && !this.duration) {
            this.duration = buffer.duration;
          }
          this.state = 'loaded';
        }
      }, () => {
      });
    }
  };
  try {
    xhr.send();
  } catch (e) {
    console.log(e);
  }
};

var _handleAudioEnded = function(audio, timers) {
  audio.paused = true;
  audio.ended = true;

  if (timers[audio.guid]) {
    clearTimeout(timers[audio.guid]);
    delete timers[audio.guid];
  }
};

function Audio(options) {
  this.src = options.src;
  this.pool = options.pool || 10;
  this.duration = 0;
  this.state = null;
  this.queue = [];
  this.timers = {};
  _initAudio.call(this);
}

var proto = {
  play: function() {
    if (!Base.isSupported()) {
      return;
    }

    _handleQueue(this.pool, this.queue);

    var audio = new WebAudio();
    audio.paused = false;
    audio.ended = false;

    this.queue.push(audio);

    var node = audio.node;

    if (this.state === 'loaded') {
      _refreshBuffer(audio, this.src);
      node.gain.setValueAtTime(1, Base.getContext().currentTime);
      node.bufferSource.start(0, 0, this.duration);
      this.timers[audio.guid] = setTimeout(() => {
        _handleAudioEnded(audio, this.timers);
      }, this.duration * 1000);
    }
  }
};

_.augment(Audio, proto);

Audio.Base = Base;

module.exports = Audio;
