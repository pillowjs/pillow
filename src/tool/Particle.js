'use strict';

const _ = require('../tool/Util');

/**
 * @class pillow.Particle Particle.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function Particle(cfg) {
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.gravity = 1;
  this.opacity = 1;
  var that = this;
  _.merge(that, cfg);
}

var proto = {
  draw: function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
  }
};

_.augment(Particle, proto);

module.exports = Particle;
