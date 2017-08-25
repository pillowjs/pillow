'use strict';

const _ = require('../tool/Util');
const Notify = require('../notify/Notify');

/**
 * @class pillow.SourceLoader SourceLoader.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function SourceLoader(cfg) {
  var that = this;
  that.hash = {};
  SourceLoader.sup.call(that, cfg);
  _.merge(that, cfg);
}

var proto = {
  load: function(query) {
    var that = this;
    that.num = 0;
    that.query = query;
    _.each(that.query, function(i) {
      that.imageLoader(i);
    });
  },
  imageLoader: function(item) {
    var that = this;
    var image = new Image();

    if (!/^data:/.test(item.src) && item.crossOrigin !== false) {
      image.crossOrigin = item.crossOrigin === true ? '*' : item.crossOrigin || '*';
    }

    image.onload = function() {
      var id = item.id;
      that.hash[id] = _.extend({}, item, {
        image: image,
        width: image.width,
        height: image.height
      });
      that.num++;
      that.emit('loaded', _.extend({}, item, {
        number: that.num,
        id: id,
        image: that.hash[id]
      }));

      if (that.num === that.getSize()) {
        that.emit('success', that.hash);
      }
    };
    image.src = item.src;
  },
  getSize: function() {
    return this.query.length;
  }
};

_.augment(SourceLoader, proto);
_.inherit(SourceLoader, Notify);

module.exports = SourceLoader;
