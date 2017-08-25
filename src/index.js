/* global define */
'use strict';

;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    return define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    return factory(exports);
  } else {
    factory(root['pillow'] || (root['pillow'] = {}));
  }
})(this, function(exports) {
  const pkg = require('../package');
  exports.version = pkg.version;
  exports.RenderObjectModel = require('./render/RenderObjectModel');
  exports.Img = require('./render/elements/Img');
  exports.Sprite = require('./render/elements/Sprite');
  exports.Text = require('./render/elements/Text');
  exports.Graphics = require('./render/elements/Graphics');
  exports.Screen = require('./render/elements/Screen');

  exports.Keyboard = require('./event/Keyboard');
  exports.Mouse = require('./event/Mouse');

  exports._ = require('./tool/Util');
  exports.Vector2d = require('./tool/Vector2d');
  exports.Math = require('./tool/Math');
  exports.SourceLoader = require('./tool/SourceLoader');
  exports.Map = require('./tool/Map');
  exports.Tween = require('./tool/Tween');
  exports.Collision = require('./tool/Collision');
  exports.Animate = require('./tool/Animate');
  exports.Audio = require('./tool/Audio');

  exports.Timer = require('monitor.js').Timer;
  exports.FPSBoard = require('monitor.js').FPSBoard;
});
