'use strict';

/**
 * @class pillow.Collision Collision.
 * @param {Object} options An object literal containing one or more of the following optional properties:
 */

function Collision(cfg) {

}

Collision.prototype.pointRect = function (point1, point2, rect) {
  return point1 > rect.x && point1 < rect.right || point2 > rect.y && point2 < rect.bottom;
};

Collision.prototype.betweenRects = function(rect1, rect2) {
  return (rect1.right > rect2.x && rect1.right < rect2.right || rect1.x > rect2.x && rect1.x < rect2.right) && (rect1.bottom > rect2.y && rect1.bottom < rect2.bottom || rect1.y < rect2.bottom && rect1.bottom > rect2.y);
};

Collision.prototype.pointCircle = function(point1, point2, circle) {
  return Math.pow(point1 - circle.x, 2) + Math.pow(point2 - circle.y, 2) < Math.pow(circle.r, 2);
};

Collision.prototype.betweenCircles = function(circle1, circle2) {
  return Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2) < Math.pow(circle1.r + circle2.r, 2);
};

module.exports = Collision;
