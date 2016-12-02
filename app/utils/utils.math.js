"use strict";
/**
 * Created by eason on 16-12-1.
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.computeIntersection = function (p1, p2, start, dir) {
        var k = 0, t = 0;
        if (p2.x !== p1.x) {
            t = (p2.y - p1.y) / (p2.x - p1.x);
            k = (p1.y + t * (start.x - p1.x) - start.y) / (dir.y - t * dir.x);
        }
        else {
            k = (p1.x - start.x) / dir.x;
        }
        return new PIXI.Point(start.x + k * dir.x, start.y + k * dir.y);
    };
    MathUtils.rotation = function (vec, deg) {
        return new PIXI.Point(vec.x * Math.cos(deg) - vec.y * Math.sin(deg), vec.y * Math.cos(deg) + vec.x * Math.sin(deg));
    };
    MathUtils.dot = function (vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    };
    MathUtils.multi = function (vec1, vec2) {
        return vec1.x * vec2.y - vec1.y * vec2.x;
    };
    return MathUtils;
}());
exports.MathUtils = MathUtils;
//# sourceMappingURL=utils.math.js.map